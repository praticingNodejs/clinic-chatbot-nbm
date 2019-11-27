let requestPromise = require('request-promise');
let version = process.env.FB_GRAPH_VERSION;
let host = process.env.FB_GRAPH_HOST;
let setOptions = (user_access_token) =>{
    return {
        method:'GET',
        uri:`${host}/${version}/me/accounts`,
        auth:{
            bearer:user_access_token
        }
    }
};
module.exports = (user_access_token) =>{
    return new Promise((resolve,reject)=>{
        requestPromise(setOptions(user_access_token)).then((response)=>{
            return resolve(JSON.parse(response))
        }).catch((result)=>{
            return reject(result.error);
        })
    });
};
