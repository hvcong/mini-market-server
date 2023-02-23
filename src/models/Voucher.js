const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Voucher = sequelize.define("Voucher", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  disCountMoney: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  disCountPercent: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  maxDiscountMoney: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
});

module.exports = Voucher;
