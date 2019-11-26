let requestPromise = require('request-promise');
let version = process.env.FB_GRAPH_VERSION;
let host = process.env.FB_GRAPH_HOST;
let setOptions = (user_access_token,page_id) =>{
    return {
        method:'GET',
        uri:`${host}/${version}/${page_id}`,
        qs:{
            fields : 'access_token'
        },
        auth:{
            bearer:user_access_token
        }
    }
};
module.exports = (user_access_token,page_id) =>{
    return new Promise((resolve,reject)=>{
        requestPromise(setOptions(user_access_token,page_id)).then((response)=>{
            return resolve(JSON.parse(response).access_token)
        }).catch((result)=>{
            return reject(result.error);
        })
    });
};
