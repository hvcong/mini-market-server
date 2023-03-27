const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const GiftProduct = sequelize.define(
  "GiftProduct",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  }
);
module.exports = GiftProduct;
