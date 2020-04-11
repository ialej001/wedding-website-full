const Joi = require("joi");

module.exports = {
  register(req, res, next) {
    const schema = {
      code: Joi.string().alphanum().length(6).required(),
    };
    console.log(req.body);
    const { error } = Joi.validate(req.body, schema);

    if (error) {
      switch (error.details[0].context.key) {
        case "code":
          res.status(400).json({
            error:
              "Code must be exactly six characters long, letters and numbers only.",
          });
          break;
        default:
          res.status(400).json({
            error: "Something happened and it's not your fault",
          });
      }
    } else {
      next();
    }
  },
  submit(req, res, next) {
    const plusOneSchema = {
      name: Joi.string()
        .regex(/^[a-zA-Z "]+$/)
        .min(3)
        .max(30)
        .required(),
      food: Joi.string().required(),
    };
    const guestSchema = {
      full_name: Joi.string(),
      food_choice: Joi.string().required(),
      guests: Joi.array(),
    };
    const returnError = [{}, {}, {}];
    let index = 1;

    // guest food validation
    const { error } = Joi.validate(req.body, guestSchema, {
      abortEarly: false,
    });
    if (error) {
      switch (error.details[0].context.key) {
        case "food_choice":
          returnError[0].food_error = "Select a dinner option.";
          break;
        default:
          returnError[0] = {
            error: "Something happened and it's not your fault",
          };
      }
    }

    // plus one validations
    req.body.guests.forEach((guest) => {
      if (Object.keys(guest).length != 0) {
        const { error } = Joi.validate(guest, plusOneSchema, {
          abortEarly: false,
        });
        if (error) {
          error.details.forEach((error) => {
            switch (error.context.key) {
              case "name":
                if (error.context.value == "") {
                  returnError[index].name_error = "Name must not be empty.";
                } else {
                  returnError[index].name_error =
                    "Name must be 3-30 characters. No numbers or special characters.";
                }
                break;
              case "food":
                returnError[index].food_error = "Select a dinner option.";
                break;
              default:
                returnError[index] = {
                  error: "Something happened and it's not your fault",
                };
            }
          });
        }
        index++;
      }
    });
    if (
      Object.keys(returnError[0]).length != 0 ||
      Object.keys(returnError[1]).length != 0 ||
      Object.keys(returnError[1]).length != 0
    ) {
      res.status(400).json(returnError);
    } else {
      next();
    }
  },
};
