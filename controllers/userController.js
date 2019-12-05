const Users = require('../models/user');
module.exports = {
    get: (req, res, next) => {
        Users.findAll().then((users) => {
            res.json({
                success: true,
                users: users
            });
        }).catch((error) => {
            res.json({
                success: false,
                error: error
            });
        })
    },
    post: (req, res, next) => {
        res.json({
            success: false
        });
    }
};