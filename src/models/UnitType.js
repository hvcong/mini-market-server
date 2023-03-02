const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const UnitType = sequelize.define("UnitType", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    // autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  convertionQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = UnitType;
