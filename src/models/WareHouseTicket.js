const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
function uid() {
    return "Ticket" + new Date().getTime();
  }

const WareHouseTicket = sequelize.define(
  "WareHouseTicket",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,      
      defaultValue: uid
    },
    createAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW        
    }
  },
  {
    timestamps: false,
  }
);

module.exports = WareHouseTicket;
