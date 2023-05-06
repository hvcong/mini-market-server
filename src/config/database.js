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

// online

// const { Sequelize } = require("sequelize");
// const sequelize = new Sequelize("sql12616145", "sql12616145", "IDZd2lbSe2", {
//   host: "sql12.freesqldatabase.com",
//   dialect: "mysql",
//   logging: false,
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000,
//   },
//   timezone: "+07:00",
// });

// module.exports = sequelize;
