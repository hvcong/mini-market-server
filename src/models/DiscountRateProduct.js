const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const DiscountRateProduct = sequelize.define(
  "DiscountRateProduct",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
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
    discountRate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    state: DataTypes.BOOLEAN,
  },
  {
    timestamps: true,
  }
);
module.exports = DiscountRateProduct;
