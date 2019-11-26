let express = require('express');
let router = express.Router();
let passport = require('passport');
router.get('/facebook',passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login', scope: ['public_profile','email','pages_messaging','publish_pages','manage_pages'] }));
module.exports = router;