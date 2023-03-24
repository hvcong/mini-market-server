const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
function uid() {
  return "PRes" + new Date().getTime();
}

const PromotionResult = sequelize.define(
  "PromotionResult",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: uid,
    },
    isSuccess: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = PromotionResult;
