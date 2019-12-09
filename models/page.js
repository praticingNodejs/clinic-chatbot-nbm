const { sequelize, Sequelize } = require('../databases/index');

const Page = sequelize.define('pages', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    idByProvider: {
        type: Sequelize.STRING,
        field: 'id_by_provider'
    },
    providerId: {
        type: Sequelize.STRING,
        field: 'provide'
    },
    accessToken: {
        type: Sequelize.STRING,
        field: 'access_token'
    },
    customerId: {
        type: Sequelize.INTEGER,
        field: 'customer_id'
    }
}, {
    timestamps: false,
    underscored: false
});

module.exports = Page