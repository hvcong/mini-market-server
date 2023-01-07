import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const CartDetail = sequelize.define("CartDetail", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: DataTypes.INTEGER,
});
module.exports = CartDetail;
