const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const StoreTransaction = sequelize.define(
  "StoreTransaction",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      // autoIncrement: true,
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
  },
  {
    timestamps: false,
  }
);
module.exports = StoreTransaction;
