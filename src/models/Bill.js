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
    cost: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  { timestamps: false }
);
module.exports = Bill;
