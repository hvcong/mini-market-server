const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const InputDetail = sequelize.define(
  "InputDetail",
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
  },
  {
    timestamps: false,
  }
);

module.exports = InputDetail;
