const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const CartDetail = sequelize.define("CartDetail", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: DataTypes.INTEGER,
});
module.exports = CartDetail;
