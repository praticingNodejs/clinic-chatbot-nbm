let request = require('request-promise');
let setOptions = (access_token, user_id, text) => {
    let body = {
        recipient: {
            "id": `${user_id}`
        },
        message: {
            "text": `${text}`
        }
    };
    return {
        resolveWithFullResponse: true,
        method: 'POST',
        uri: 'https://graph.facebook.com/v5.0/me/messages',
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
            return resolve({ task: 'sendTextFacebook', success: true });
        }).catch((error) => {
            return reject({ task: 'sendTextFacebook', success: false, error: error });
        });
    });
};