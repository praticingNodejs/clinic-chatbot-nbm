let request = require('request-promise');
let setOptions = (access_token,user_id,url)=>{
    let body = {
        recipient:{
            "id":`${user_id}`
        },
        message:{
            attachment:{
                type:'images',
                payload:{
                    url:`${url}`,
                    is_reusable:true
                }
            }
        }
    };
    return {
        resolveWithFullResponse: true,
        method:'POST',
        uri: 'https://graph.facebook.com/v5.0/me/messages',
        qs: {
            access_token : access_token
        },
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(body),
    }
};
module.exports = (access_token,recipient_id,text) =>{
    return new Promise((resolve,reject)=>{
        let options = setOptions(access_token,recipient_id,text);
        request(options).then(()=>{
            return resolve({task:'sendImageFacebook',success:true});
        }).catch((error)=>{
            return reject({task:'sendImageFacebook',success:false,error:error});
        });
    });
};


