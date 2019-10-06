const Sequelize = require ('sequelize');

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