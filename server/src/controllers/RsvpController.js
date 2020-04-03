const { Guest } = require("../models");

module.exports = {
  async register(req, res) {
    await Guest.findAll({
      where: {
        rsvp_code: req.body.code
      }
    })
      .then(currentGuest => {
        const {
          full_name,
    
          food_choice,
          num_of_guests,
          rsvp_consumed
        } = currentGuest[0].dataValues;

        res.send({
          full_name: full_name,
          food_choice: food_choice,
          num_of_guests: num_of_guests,
          rsvp_consumed: rsvp_consumed
        });
      })
      .catch(() => {
        res.status(500).send({
          message: "nothing here captain"
        });
      });
  }
};
