const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const Bill = sequelize.define("Bill", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cost: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});
module.exports = Bill;
