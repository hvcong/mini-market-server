const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const GiftProduct = sequelize.define("GiftProduct", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: DataTypes.INTEGER,
});
module.exports = GiftProduct;
