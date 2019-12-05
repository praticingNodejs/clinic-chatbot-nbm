module.exports = {
    getCallback: (req, res, next) => {
        console.log(JSON.stringify(req.body));
        res.json({
            success: true
        });
    },
    postCallback: (req, res, next) => {
        console.log(JSON.stringify(req.body));
        res.json({
            success: true
        });
    },
    getWebhook: (req, res, next) => {
        console.log(JSON.stringify(req.body));
        res.json({
            success: true
        });
    },
    postWebhook: (req, res, next) => {
        console.log(JSON.stringify(req.body));
        res.json({
            success: true
        });
    },

};