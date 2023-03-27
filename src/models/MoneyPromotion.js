const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const MoneyPromotion = sequelize.define(
  "MoneyPromotion",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description:{
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    type: {
      type: DataTypes.STRING,
    },
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
    },
    budget: {
      type: DataTypes.DOUBLE
    },
    availableBudget: {
      type: DataTypes.DOUBLE
    }
  },
  {
    timestamps: false,
  }
);
module.exports = MoneyPromotion;
