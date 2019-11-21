let Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USERNAME, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    port:process.env.PG_PORT,
    dialect: 'postgres',
    dialectOptions:{
        ssl:true
    },

});
//const sequelize = new Sequelize('postgres://qnaumnpzbdlwaj:b71309ada1e5a0295ca1a736ac9d30fb437811ad552a25528055788ee71048ce@ec2-174-129-253-42.compute-1.amazonaws.com:5432/deu89fgkn5l7nq?ssl=true');
module.exports = {sequelize, Sequelize};
module.exports.Op = Op;

