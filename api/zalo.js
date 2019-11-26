let zaloController = require('../controllers/zaloController');
module.exports = (app) =>{
    app.route('/api/zalo/callback')
        .get(zaloController.getCallback)
        .post(zaloController.postCallback);
    app.route('/api/zalo/webhook')
        .get(zaloController.getWebhook)
        .post(zaloController.postWebhook);
};
