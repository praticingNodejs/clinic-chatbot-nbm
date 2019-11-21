let webhookFacebookController = require('../controllers/webhookFacebookController');
module.exports = (app) =>{
    app.route('/api/webhook/facebook')
        .get(webhookFacebookController.get)
        .post(webhookFacebookController.post)
};