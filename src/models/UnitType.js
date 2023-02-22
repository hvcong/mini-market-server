const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const UnitType = sequelize.define("UnitType", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UnitType;
