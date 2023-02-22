const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const PromotionResult = sequelize.define("PromotionResult", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isSuccess: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  
});
module.exports = PromotionResult;
