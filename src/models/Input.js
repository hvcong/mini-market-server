const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Input = sequelize.define(
  "Input",
  {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    createAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    note: {
        type: DataTypes.STRING,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Input;
