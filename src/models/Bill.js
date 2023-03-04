const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const Bill = sequelize.define("Bill", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    // autoIncrement: true,
  },
  orderDate: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:DataTypes.NOW
  },
  cost: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
});
module.exports = Bill;
