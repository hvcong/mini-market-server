const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const Salary = sequelize.define("Salary", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
  salary: DataTypes.DOUBLE,
});
module.exports = Salary;
