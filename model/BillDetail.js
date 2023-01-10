const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const BillDetail = sequelize.define("BillDetail", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: DataTypes.INTEGER,
});

module.exports = BillDetail;
