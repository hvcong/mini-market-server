const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const TicketDetail = sequelize.define("TicketDetail", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  reportQty: {
    type: DataTypes.INTEGER,
  },
  realQty: {
    type: DataTypes.INTEGER,  
  },
},
{
  timestamps: false,
});

module.exports = TicketDetail;
