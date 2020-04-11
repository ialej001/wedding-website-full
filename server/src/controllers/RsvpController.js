const { Guest, PlusOnes } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function jwtSignRSVP(guest) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(guest, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async register(req, res) {
    await Guest.findAll({
      where: {
        rsvp_code: req.body.code,
      },
    })
      .then((currentGuest) => {
        const guest = currentGuest[0].dataValues;

        res.send({
          guest: guest,
          token: jwtSignRSVP(guest),
        });
      })
      .catch(() => {
        res.status(500).send({
          message: "Failed to find any entry with that code.",
        });
      });
  },

  async rsvpSubmit(req, res) {
    const { guests } = req.body;

    guests.forEach(async (guest) => {
      if (Object.keys(guest).length != 0) {
        const plusOnes = PlusOnes.build();
        const { name, food } = guest;

        plusOnes.plus_one_to = req.body.full_name;
        plusOnes.food_choice = food;
        plusOnes.full_name = name;
        await plusOnes.save().catch(() => {});
      }
    });

    await Guest.update(
      { food_choice: req.body.food_choice, rsvp_consumed: true },
      {
        where: {
          full_name: req.body.full_name,
        },
      }
    )
      .then(() => {
        res.status(200).send({ message: "Updated!" });
      })
      .catch(() => {
        res.status(500).send({
          message: "Something bad happened..",
        });
      });
  },
};
