const { Sequelize } = require ("sequelize");
const sequelize = new Sequelize(
    'minimarket',
    'root',
    'butle135201',
    {
        host:'localhost',
        dialect: 'mysql',
        pool:{
            max:5,
            min:0,
            idle:10000,
        }
    }
)


module.exports = sequelize