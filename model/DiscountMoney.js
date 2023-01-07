import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const DiscountMoney = sequelize.define("DiscountMoney", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  DiscountMoney: DataTypes.DOUBLE,
});
module.exports = DiscountMoney;
