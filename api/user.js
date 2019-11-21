let userController = require('../controllers/userController');
module.exports = (app) =>{
    app.route('/api/users')
        .get(userController.get)
        .post(userController.post)
};