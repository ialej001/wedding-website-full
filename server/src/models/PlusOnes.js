
module.exports = function (sequelize, DataTypes) {
  const PlusOnes = sequelize.define('PlusOnes', {
    full_name: {
      type: DataTypes.STRING,
      unique: true
    },
    food_choice: DataTypes.STRING,
    plus_one_to: DataTypes.STRING
  });

  return PlusOnes
};
