const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const GiftByProduct = sequelize.define("GiftByProduct", {
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
  minQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: DataTypes.BOOLEAN,
});
module.exports = GiftByProduct;