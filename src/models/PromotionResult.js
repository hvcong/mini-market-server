const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const PromotionResult = sequelize.define(
  "PromotionResult",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isSuccess: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    timestamps: false,
  }
);
module.exports = PromotionResult;
