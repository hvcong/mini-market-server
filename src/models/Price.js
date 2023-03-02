const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Price = sequelize.define("Price", {
  startDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});
module.exports = Price;
