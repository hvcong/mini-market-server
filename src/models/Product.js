const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const Product = sequelize.define(
  "Product",
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state:{
      type: DataTypes.BOOLEAN,
    }
  },
  {
    timestamps: false,
  }
);
module.exports = Product;
