let request = require('request-promise');
let setOptions = (page_access_token,user_id,text,quick_replies)=>{
    let body = {
        "recipient":{
            "id":user_id
        },
        "messaging_type": "RESPONSE",
        "message":{
            "text": text,
            "quick_replies":quick_replies
        }
    };
    return {
        resolveWithFullResponse: true,
        method:'POST',
        uri: 'https://graph.facebook.com/v5.0/me/messages',
        qs: {
            access_token : page_access_token
        },
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(body),
    }
};
module.exports = (access_token,recipient_id,text,quick_replies) =>{
    return new Promise((resolve,reject)=>{
        let options = setOptions(access_token,recipient_id,text,quick_replies);
        console.log(options);
        request(options).then(()=>{
            return resolve({task:'sendQuickRepliesTemplateFacebook',success:true});
        }).catch((error)=>{
            return reject({task:'sendQuickRepliesTemplateFacebook',success:false});
        });
    });
};
let run = (access_token,recipient_id,text,quick_replies) =>{
    return new Promise((resolve,reject)=>{
        let options = setOptions(access_token,recipient_id,text,quick_replies);
        request(options).then(()=>{
            return resolve({task:'sendQuickRepliesTemplateFacebook',success:true});
        }).catch((error)=>{
            return reject({task:'sendQuickRepliesTemplateFacebook',success:false});
        });
    });
};



