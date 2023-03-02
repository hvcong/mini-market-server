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
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  minCost: {
    type: DataTypes.DATE,
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
    allowNull: false,
  }
});
module.exports = MoneyPromotion;
