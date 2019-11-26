const { sequelize, Sequelize } = require('../databases/index');
const Session = sequelize.define('sessions', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id'
    },
    templateId: {
        type: Sequelize.INTEGER,
        field: 'template_id'
    },
    question: {
        type: Sequelize.STRING,
        field: 'question'
    }
}, {
    timestamps: false,
    underscored: false
})

module.exports = Session