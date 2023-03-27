const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Voucher = sequelize.define(
  "Voucher",
  {
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
    state: {
      type: DataTypes.BOOLEAN
    },
    type: {
      type: DataTypes.STRING,
    },
    discountMoney: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    discountRate: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    maxDiscountMoney: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = Voucher;
