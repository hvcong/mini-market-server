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
    },
    note: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: false,
  }
);

module.exports = WareHouseTicket;
