const Sequelize = require ('sequelize');

const sequelize = new Sequelize(
    'heroku_29b304c1e6caefe', // DATABASE NAME
    'b6ca1048637614', // USERNAME
    '364afa27', // PASSWORD
    {
        host:'us-cdbr-iron-east-05.cleardb.net',
        dialect: 'mysql',
        pool:{
            max:5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging:false
    }
)


/*
const sequelize = new Sequelize(
    'miincode',
    'miincode_db_user',
    'miincode_db_pwd',
    {
        host:'23.229.166.164',
        dialect: 'mysql',
        pool:{
            max:5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging:false
    }
)
*/

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;