const sequelize = require("../config/database");
const { DataTypes, UUIDV4 } = require("sequelize");

function uid() {
  return "TRS" + new Date().getTime();
}

const StoreTransaction = sequelize.define(
  "StoreTransaction",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uid,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = StoreTransaction;
