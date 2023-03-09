const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const Bill = sequelize.define("Bill", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:DataTypes.NOW
  },
  cost: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
},{ timestamps: false});
module.exports = Bill;
