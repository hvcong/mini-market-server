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
  reportQtyBase:{
    type: DataTypes.INTEGER
  },
  realReportQty: {
    type: DataTypes.INTEGER,  
  },
  realBaseQty: {
    type: DataTypes.INTEGER,  
  },
},
{
  timestamps: false,
});

module.exports = TicketDetail;
