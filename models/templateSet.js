const {sequelize, Sequelize} = require('../databases/index');

const TemplateSet = sequelize.define('templatesets', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    listQuestion: {
        type: Sequelize.STRING,
        field: 'listQuestion'
    },
    category: {
        type: Sequelize.STRING,
        field: 'category'
    }
}, {
    timestamps: false,
    underscored: false,
    tableName: 'templatesets'
});