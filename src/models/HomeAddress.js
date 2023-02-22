const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const HomeAddress = sequelize.define("HomeAddress", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = HomeAddress;
