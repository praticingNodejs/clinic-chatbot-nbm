let request = require('request-promise');
let setOptions = (access_token,user_id,text,buttons)=>{
    let body = {
        recipient:{
            "id":user_id
        },
        message:{
            attachment:{
                type:'template',
                payload:{
                    template_type:'button',
                    text:text,
                    buttons:buttons
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
module.exports = (access_token,recipient_id,text,buttons) =>{
    return new Promise((resolve,reject)=>{
        let options = setOptions(access_token,recipient_id,text,buttons);
        console.log(options);
        request(options).then(()=>{
            return resolve({task:'sendButtonsTemplateFacebook',success:true});
        }).catch((error)=>{
            return reject({task:'sendButtonsTemplateFacebook',success:false});
        });
    });
};


