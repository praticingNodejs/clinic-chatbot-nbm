const {sequelize, Sequelize} = require('../databases/index');

const TrainingData = sequelize.define('training_datas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    underscored: false
});

module.exports = TrainingData;