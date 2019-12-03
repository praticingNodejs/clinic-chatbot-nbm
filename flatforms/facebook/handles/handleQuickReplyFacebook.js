let User = require('../../../models/user');
let Session = require('../../../models/session');
let Book = require('../../../models/book');
let logs = require('../../../logs');
let path = require('path');
let filename = path.basename(__filename);
module.exports = async(user_id, payload) => {
    let name = payload.name;
    let data = payload.data;
    switch (name) {
        case 'getSex':
            {
                await User.update({ sex: data, where: { user_id: user_id, provider: 'facebook' } }).then(() => {}).catch((error) => {
                    logs(filename, false, error);
                });
                break;
            }
        case 'getHour':
            {
                await Book.update({ time: data, where: { user_id: user_id, status: 'pending', provider: 'facebook' } }).then(() => {}).catch((error) => {
                    logs(filename, false, error);
                });
                break;
            }
        case 'confirmBook':
            {
                if (data === 'yes') {} else {
                    await Book.update({ status: 'canceled' }).then(() => {

                    }).catch((error) => {
                        logs(filename, false, error);
                    });
                }
            }
        case 'canceledBook':
            {
                if (data === 'yes') {
                    Book.destroy({ where: { user_id: user_id, status: 'pending', provider: 'facebook' } }).then(() => {}).catch((error) => {
                        logs(filename, false, error);
                    })
                }
                break;
            }
        default:
            {
                break;
            }
    }
};