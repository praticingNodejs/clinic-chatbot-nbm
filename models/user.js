const {sequelize, Sequelize} = require('../databases/index');

const User= sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    provider: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING,

    },

    dateOfBirth: {
        type: Sequelize.DATE,

    },
    sex: {
        type: Sequelize.STRING,

    },
    phone: {
        type: Sequelize.INTEGER,
        validate: {
            is: /(09|01[2|6|8|9])+([0-9]{8})\b/g
        },
        field: 'phone'
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            is: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g
        }
    },
    address: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
    underscored: false,
    tableName: 'users'
});

module.exports = User;