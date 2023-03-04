const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const TypeCustomer = sequelize.define("TypeCustomer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = TypeCustomer;
