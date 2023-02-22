const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Street = sequelize.define("Street", {
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

module.exports = Street;
