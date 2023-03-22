const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const ProductUnitType = require("./ProductUnitype");
const ProductPromotion = require("./ProductPromotion");

const pUnitpPromotion = sequelize.define(
  "pUnitpPromotion",
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
    ProductPromotionId: {
      type: DataTypes.STRING,
      references: {
        model: ProductPromotion, // 'Actors' would also work
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = pUnitpPromotion;
