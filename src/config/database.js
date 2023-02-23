const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("minimarket", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  timezone: "+07:00",
});

module.exports = sequelize;
