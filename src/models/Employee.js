const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = Employee;
