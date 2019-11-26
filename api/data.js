let dataUserController = require('../controllers/dataUserController');
module.exports = (app)=>{
    app.route('/api/data/users')
        .post(dataUserController.post)
};