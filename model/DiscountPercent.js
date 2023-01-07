import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const DiscountPercent = sequelize.define("DiscountPercent", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  discountPercent: DataTypes.DOUBLE,
});
module.exports = DiscountPercent;
