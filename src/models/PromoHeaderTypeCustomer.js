const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const TypeCustomer = require('../models/TypeCustomer')
const PromotionHeader = require('../models/PromotionHeader')

const PromotionTypeCustomer = sequelize.define("PromotionTypeCustomer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  TypeCustomerId: {
    type: DataTypes.STRING,
    references: {
      model: TypeCustomer, // 'Movies' would also work
      key: "id",
    },
  },
  PromotionHeaderId: {
    type: DataTypes.STRING,
    references: {
      model: PromotionHeader, // 'Actors' would also work
      key: "id",
    },
  },
},
{
  timestamps: true,
});

module.exports = PromotionTypeCustomer;
