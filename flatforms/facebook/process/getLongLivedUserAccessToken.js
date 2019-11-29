let requestPromise = require('request-promise');
let version = process.env.FB_GRAPH_VERSION;
let host = process.env.FB_GRAPH_HOST;
let client_id = process.env.FB_CLIENT_ID;
let client_secret = process.env.FB_CLIENT_SECRET;
let setOptions = (user_access_token) =>{
    return {
        method:'GET',
        uri:`${host}/${version}/oauth/access_token`,
        qs:{
            grant_type: 'fb_exchange_token',
            client_id: client_id,
            client_secret: client_secret,
            fb_exchange_token : user_access_token
        },
    }
};
module.exports = (user_access_token) =>{
    return new Promise((resolve,reject)=>{
        requestPromise(setOptions(user_access_token)).then((response)=>{
            return resolve(JSON.parse(response).access_token)
        }).catch((result)=>{
            return reject(result.error);
        })
    });
};
