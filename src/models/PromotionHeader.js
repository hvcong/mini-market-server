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
    desciption: {
      type: DataTypes.STRING,
    },
    budget: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    state: DataTypes.BOOLEAN,
  },
  {
    timestamps: false,
  }
);
module.exports = PromotionHeader;
