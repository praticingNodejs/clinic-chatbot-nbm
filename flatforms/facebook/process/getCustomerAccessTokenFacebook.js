let requestPromise = require('request-promise');
let version = process.env.FB_GRAPH_VERSION;
let host = process.env.FB_GRAPH_HOST;
let setOptions = (code) => {
    return {
        method: 'GET',
        uri: `https://${host}/${version}/oauth/access_token`,
        qs: {
            client_id: process.env.FB_CLIENT_ID,
            client_secret: process.env.FB_CLIENT_SECRET,
            redirect_uri: process.env.FB_CALLBACK_URL,
            code: code
        },
    }
};
module.exports = (code) => {
    return new Promise((resolve, reject) => {
        requestPromise(setOptions(code)).then((response) => {
            return resolve(JSON.parse(response).access_token)
        }).catch((result) => {
            return reject(result.error);
        })
    });
};