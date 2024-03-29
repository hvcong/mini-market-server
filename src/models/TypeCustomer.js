const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const TypeCustomer = sequelize.define(
  "TypeCustomer",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      // autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = TypeCustomer;
