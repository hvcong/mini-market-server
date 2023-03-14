const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("../models/Product");
const UnitType = require("../models/UnitType");

const ProductUnitType = sequelize.define("ProductUnitType", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ProductId: {
    type: DataTypes.STRING,
    references: {
      model: Product, // 'Movies' would also work
      key: "id",
    },
  },
  UnitTypeId: {
    type: DataTypes.STRING,
    references: {
      model: UnitType, // 'Actors' would also work
      key: "id",
    },
  },
  state: {
    type: DataTypes.BOOLEAN
  }
},
{
  timestamps: false,
});

module.exports = ProductUnitType;
