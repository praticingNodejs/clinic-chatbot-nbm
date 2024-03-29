const { sequelize, Sequelize } = require('../databases/index');

const TemplateSet = sequelize.define('template_sets', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    questionList: {
        type: Sequelize.STRING,
        field: 'question_list'
    },
    category: {
        type: Sequelize.STRING,
        field: 'category'
    }
}, {
    timestamps: false,
    underscored: false
})

module.exports = TemplateSet