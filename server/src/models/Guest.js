const Promise = require('bluebird')
const bycrpt = Promise.promisifyAll(require('bcryptjs'))

module.exports = function (sequelize, DataTypes) {
  const Guest = sequelize.define('Guest', {
    full_name: {
      type: DataTypes.STRING,
      unique: true
    },
    num_of_guests: DataTypes.INTEGER,
    food_choice: DataTypes.STRING,
    rsvp_code: DataTypes.STRING,
    rsvp_consumed: DataTypes.BOOLEAN
  });

  Guest.prototype.compareCode = function (rsvp_code) {
    return bycrpt.compareAsync(rsvp_code, this.rsvp_code)
  }

  return Guest
};
