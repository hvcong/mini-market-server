import sequelize from "../config/database.js";
import { Model, DataTypes } from "sequelize";

const BillDetail = sequelize.define("BillDetail", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: DataTypes.INTEGER,
});

module.exports = BillDetail;
