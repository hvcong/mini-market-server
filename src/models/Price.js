const sequelize = require("../config/database");
const { DataTypes, UUIDV4 } = require("sequelize");

const Price = sequelize.define(
  "Price",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Price;
