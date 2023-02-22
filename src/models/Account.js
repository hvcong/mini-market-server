const sequelize = require ("../config/database");
const { DataTypes } = require ("sequelize");

const Account = sequelize.define("Account", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  }
  ,
  pointAchive: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  }
});

module.exports = Account;
