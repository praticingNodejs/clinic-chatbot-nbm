let facebookController = require('../controllers/facebookController');
module.exports = (app) =>{
    app.route('/api/facebook/webhook')
        .get(facebookController.getWebhook)
        .post(facebookController.postWebhook);
    app.route('/api/facebook/callback')
        .get(facebookController.getCallback)
        .post(facebookController.postCallback)
};
