const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  state:{
    type: DataTypes.BOOLEAN
  }
}, {timestamps: true});

module.exports = Category;
