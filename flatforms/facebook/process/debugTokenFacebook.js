let request = require('request-promise');
let version = process.env.FB_GRAPH_VERSION;
let host = process.env.FB_GRAPH_HOST;
let setOptions = (access_token,input_token)=>{
    return {
        resolveWithFullResponse: true,
        method:'GET',
        uri: `https://${host}/${version}/debug_token`,
        qs: {
            input_token:input_token,
            access_token : access_token
        },
        headers : {
            "Content-Type": "application/json"
        }
    }
};
module.exports = (access_token,input_token) =>{
    return new Promise((resolve,reject)=>{
        let options = setOptions(access_token,input_token);
        request(options).then(()=>{
            return resolve({task:'DeBugTokenFacebook',success:true});
        }).catch((error)=>{
            return reject({task:'DeBugTokenFacebook',success:false,error:error});
        });
    });
};


