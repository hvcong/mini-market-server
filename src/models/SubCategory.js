const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// const Product = require('../models/Product')
const SubCategory = sequelize.define(
  "SubCategory",
  {
    // SubCategoryId: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: Category, // 'Movies' would also work
    //     key: 'id'
    //   }
    // },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
    },
  },
  { timestamps: false }
);

module.exports = SubCategory;
