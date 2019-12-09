let request = require('request-promise');
let setOptions = (access_token, user_id, type, message) => {
    let body = {
        get_started: {
            payload: {
                type: type,
                message: message
            }
        }
    };
    return {
        resolveWithFullResponse: true,
        method: 'POST',
        uri: 'https://graph.facebook.com/v5.0/me/messenger_profile',
        qs: {
            access_token: access_token
        },
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    }
};
module.exports = (access_token, recipient_id, text) => {
    return new Promise((resolve, reject) => {
        let options = setOptions(access_token, recipient_id, text);
        request(options).then(() => {
            return resolve({ task: 'setButtonGetStartedFacebook', success: true });
        }).catch((error) => {
            return reject({ task: 'setButtonGetStartedFacebook', success: false, error: error });
        });
    });
};