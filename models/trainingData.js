const { sequelize, Sequelize } = require('../databases/index');

const TrainingData = sequelize.define('training_datas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'text'
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'category'
    }
}, {
    timestamps: false,
    underscored: false
});

module.exports = TrainingData;