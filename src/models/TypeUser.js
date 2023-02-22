const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const TypeUser = sequelize.define("TypeUser", {
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

module.exports = TypeUser;
