const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const ListPricesHeader = sequelize.define(
  "ListPricesHeader",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: {
        type: DataTypes.STRING
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = ListPricesHeader;
