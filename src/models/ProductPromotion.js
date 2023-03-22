const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const ProductPromotion = sequelize.define(
  "ProductPromotion",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,      
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    minQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state: DataTypes.BOOLEAN,
  },
  {
    timestamps: false,
  }
);
module.exports = ProductPromotion;
