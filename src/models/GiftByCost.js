const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const GiftByCost = sequelize.define("GiftByCost", {
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
  minCost: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: DataTypes.BOOLEAN,
});
module.exports = GiftByCost;