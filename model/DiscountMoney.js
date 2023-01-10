const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const DiscountMoney = sequelize.define("DiscountMoney", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  DiscountMoney: DataTypes.DOUBLE,
});
module.exports = DiscountMoney;
