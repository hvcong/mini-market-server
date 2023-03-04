const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const MoneyPromotion = sequelize.define("MoneyPromotion", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    // autoIncrement: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  minCost: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  state: DataTypes.BOOLEAN,
  discountMoney: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  discountRate: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  maxMoneyDiscount: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  }
});
module.exports = MoneyPromotion;
