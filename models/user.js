const { sequelize, Sequelize } = require('../databases/index');

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    provider: {
        type: Sequelize.STRING,
        field: 'provider'
    },
    fullName: {
        type: Sequelize.STRING,
        field: 'full_name'
    },
    birthYear: {
        type: Sequelize.INTEGER,
        field: 'birth_year'
    },
    sex: {
        type: Sequelize.STRING,
        field: 'sex'
    },
    phone: {
        type: Sequelize.STRING,
        validate: {
            is: /(09|01[2|6|8|9])+([0-9]{8})\b/g
        },
        field: 'phone'
    },
    address: {
        type: Sequelize.STRING,
        field: 'address'
    },
    idByProvider: {
        type: Sequelize.INTEGER,
        field: 'id_by_provider'
    }
}, {
    timestamps: false,
    underscored: false
});

module.exports = User;