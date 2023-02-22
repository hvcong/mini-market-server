const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const PromotionHeader = sequelize.define("PromotionHeader", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  budget: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  status: DataTypes.BOOLEAN,
});
module.exports = PromotionHeader;
