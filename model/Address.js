import sequelize from "../config/database.js";
import { Model, DataTypes } from "sequelize";

const Address = sequelize.define("Address", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  city: DataTypes.STRING,
  ward: DataTypes.STRING,
  street: DataTypes.STRING,
  homeNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Address;
