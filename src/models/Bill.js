const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
function uid() {
  return "Bill" + new Date().getTime();
}

const Bill = sequelize.define(
  "Bill",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uid,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    isDDH:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cost: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);
module.exports = Bill;
