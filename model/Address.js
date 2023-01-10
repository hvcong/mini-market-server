const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const Address = sequelize.define("Address", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  city: DataTypes.STRING,
  ward: DataTypes.STRING,
  street: DataTypes.STRING,
  homeNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Address;
