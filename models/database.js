const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USERNAME, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }
})

module.exports.Op = sequelize.Op
module.exports = { sequelize, Sequelize }