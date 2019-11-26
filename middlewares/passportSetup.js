module.exports = (passport)=>{
    let FacebookStrategy = require('passport-facebook').Strategy;
    let Customer = require('../models/customer');
    passport.use(new FacebookStrategy({
            clientID: process.env.FB_CLIENT_ID,
            clientSecret: process.env.FB_CLIENT_SECRET,
            callbackURL: process.env.FB_CALLBACK_URL
        },
        accessToken=> {console.log(accessToken)},
        function(accessToken, refreshToken, profile, done) {
            console.log(accessToken,refreshToken,profile);
            Customer.findOrCreate({where:{}}, function(err, user) {
                if (err) { return done(err); }
                done(null, user);
            });
        }
    ));
};
