const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const District = sequelize.define(
  "District",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      // autoIncrement: true,
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

module.exports = District;
