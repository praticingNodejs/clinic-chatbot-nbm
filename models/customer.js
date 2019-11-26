const { sequelize, Sequelize } = require('../databases/index');

const Customer = sequelize.define('customers', {
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
    provider: {
        type: Sequelize.STRING,
        field: 'provider'
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            is: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/g
        },
        field: 'email'
    },
    accessToken: {
        type: Sequelize.STRING,
        field: 'access_token'
    }
}, {
    timestamps: false,
    underscored: false
});

module.exports = Customer;