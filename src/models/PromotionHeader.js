const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const PromotionHeader = sequelize.define(
  "PromotionHeader",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    state: DataTypes.BOOLEAN,
  },
  {
    timestamps: true,
  }
);
module.exports = PromotionHeader;
