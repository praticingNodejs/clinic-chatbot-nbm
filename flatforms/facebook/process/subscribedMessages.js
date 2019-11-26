let requestPromise = require('request-promise');
let version = process.env.FB_GRAPH_VERSION;
let host = process.env.FB_GRAPH_HOST;
let setOptions = (user_access_token,page_id) =>{
    return {
        method:'POST',
        uri:`${host}/${version}/${page_id}`,
        qs:{
            subscribed_fields : 'messages,messaging_postbacks',
        },
        auth:{
            bearer:user_access_token
        }
    }
};
module.exports = (user_access_token,page_id) =>{
    return new Promise((resolve,reject)=>{
        requestPromise(setOptions(user_access_token,page_id)).then((response)=>{
            return resolve(JSON.parse(response))
        }).catch((result)=>{
            return reject(result.error);
        })
    });
};
