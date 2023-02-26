const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const ProductLine = sequelize.define(
  "ProductLine",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      // autoIncrement: true,
    },
    dateOfManufature: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = ProductLine;
