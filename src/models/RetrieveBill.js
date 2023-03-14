const sequelize = require("../config/database");
const { DataTypes, UUIDV4 } = require("sequelize");

const RetrieveBill = sequelize.define(
  "RetrieveBill",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },    
    note: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
  }
);
module.exports = RetrieveBill;
