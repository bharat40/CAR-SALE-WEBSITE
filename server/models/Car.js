const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Car = sequelize.define("Car", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING,
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // this will store the image URL or filename
    allowNull: true,
  },
});

module.exports = Car;
