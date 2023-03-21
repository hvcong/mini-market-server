const sequelize = require("../config/database");
const { DataTypes, UUIDV4 } = require("sequelize");

const StoreTransaction = sequelize.define(
  "StoreTransaction",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    quantity: {
      type: DataTypes.INTEGER,      
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },    
    priceIn: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
  }
);
module.exports = StoreTransaction;
