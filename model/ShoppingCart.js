const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const ShoppingCart = sequelize.define("ShoppingCart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
module.exports = ShoppingCart;
