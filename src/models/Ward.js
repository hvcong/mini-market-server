const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Ward = sequelize.define(
  "Ward",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Ward;
