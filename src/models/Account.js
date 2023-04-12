const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Account = sequelize.define(
  "Account",
  {
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "NV",
    },
    pointAchive: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Account;
