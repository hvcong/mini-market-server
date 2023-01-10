const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const DiscountPercent = sequelize.define("DiscountPercent", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  discountPercent: DataTypes.DOUBLE,
});
module.exports = DiscountPercent;
