const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const BillDetail = sequelize.define(
  "BillDetail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
  },
  { timestamps: false }
);

module.exports = BillDetail;
