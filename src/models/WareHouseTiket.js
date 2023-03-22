const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
function uid() {
    return "Ticket-" + new Date().getTime();
  }

const WareHouseTiket = sequelize.define(
  "WareHouseTiket",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,      
      defaultValue: uid
    },
    reportQty: {
      type: DataTypes.INTEGER,      
    },
    realQty: {
        type: DataTypes.INTEGER,        
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

module.exports = WareHouseTiket;
