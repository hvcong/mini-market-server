const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const UnitType = sequelize.define(
  "UnitType",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    convertionQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = UnitType;
