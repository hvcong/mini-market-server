
const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')
const Product = require('../models/Product')
const Category = require('../models/Category')
const CategoryProduct = sequelize.define('CategoryProduct', {
  CategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category, // 'Movies' would also work
      key: 'id'
    }
  },
  ProductId: {
    type: DataTypes.STRING,
    references: {
      model: Product, // 'Actors' would also work
      key: 'id'
    }
  }
});

module.exports = CategoryProduct