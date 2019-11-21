const {sequelize, Sequelize} = require('../databases/index');

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
        values: ['pending', 'verified'],
        field: 'status'
    },
    bookDate: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
    underscored: false,
    tableName: 'books'
});