const sequelize = require("../config/database");
const { DataTypes, UUIDV4 } = require("sequelize");
function uid() {
  return "retri" + new Date().getTime();
}

const RetrieveBill = sequelize.define(
  "RetrieveBill",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uid,
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    note: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = RetrieveBill;
