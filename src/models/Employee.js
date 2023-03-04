const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const Employee = sequelize.define("Employee", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    // autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Employee;
