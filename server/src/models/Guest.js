module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Guest', {
    full_name: {
      type: DataTypes.STRING,
      unique: true
    },
    num_of_guests: DataTypes.INTEGER,
    food_choice: DataTypes.STRING,
    rsvp_code: DataTypes.STRING,
    rsvp_consumed: DataTypes.BOOLEAN
  });
};
