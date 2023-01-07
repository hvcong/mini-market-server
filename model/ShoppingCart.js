import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const ShoppingCart = sequelize.define("ShoppingCart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
module.exports = ShoppingCart;
