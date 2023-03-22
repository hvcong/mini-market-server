const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const ProductUnitType = require("./ProductUnitype");
const DiscountRateProduct = require("./DiscountRateProduct");

const pUnitDRProduct = sequelize.define(
  "pUnitDRProduct",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ProductUnitTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: ProductUnitType, // 'Movies' would also work
        key: "id",
      },
    },
    DiscountRateProductId: {
      type: DataTypes.STRING,
      references: {
        model: DiscountRateProduct, // 'Actors' would also work
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = pUnitDRProduct;
