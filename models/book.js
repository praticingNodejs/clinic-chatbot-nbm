const { sequelize, Sequelize } = require('../databases/index');

const Book = sequelize.define('books', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'pending',
        values: ['pending', 'verified', 'canceled'],
        field: 'status'
    },
    time: {
        type: Sequelize.INTEGER,
        field: 'time'
    },
    date: {
        type: Sequelize.DATE,
        field: 'date'
    },
    reason: {
        type: Sequelize.STRING,
        field: 'reason'
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id'
    }
}, {
    timestamps: false,
    underscored: false
});

module.exports = Book;