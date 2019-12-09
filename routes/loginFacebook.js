let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    res.render('loginFacebook');
});
module.exports = router;