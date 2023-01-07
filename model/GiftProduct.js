import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const GiftProduct = sequelize.define("GiftProduct", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: DataTypes.INTEGER,
});
module.exports = GiftProduct;
