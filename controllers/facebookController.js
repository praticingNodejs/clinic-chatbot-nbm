let handleTextFacebook = require('../flatforms/facebook/handles/handleTextFacebook');
let handlePostbackFacebook = require('../flatforms/facebook/handles/handlePostbackFacebook');
let getCustomerAccessTokenFacebook = require('../flatforms/facebook/process/getCustomerAccessTokenFacebook');
module.exports = {
    getWebhook: (req,res,next)=>{
        console.log(JSON.stringify(req.body));
        let VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];
        if (mode && token) {
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                console.log('WEBHOOK_VERIFIED');
                res.status(200).send(challenge);
            } else {
                res.sendStatus(403);
            }
        }else{
            res.sendStatus(403);
        }
    },
    postWebhook: async ( req,res,next) =>{
        console.log(JSON.stringify(req.body));
        try{
            let body = req.body;
            let object = body["object"];
            let entry = body["entry"];
            let id = entry[0].id;
            let time = entry[0].time;
            let messaging = entry[0].messaging;
            let sender = messaging[0].sender;
            let sender_id = sender.id;
            let recipient = messaging[0].recipient;
            let recipient_id = recipient.id;
            let timestamp = messaging[0].timestamp;
            let message = messaging[0].message;
            let postback = messaging[0].postback;
            if (message){
                if (message.text !== null && message.text !== undefined) {
                    let text = message.text;
                    await handleTextFacebook(sender_id, text);
                }else if (message.attachments !== null && message.attachments !== undefined){
                    let attachments = message.attachments;
                }
            }else if(postback){
                let title = postback.title;
                let payload = JSON.parse(postback.payload);
                console.log(title,payload);
                await handlePostbackFacebook(sender_id,payload)
            }
            res.json({
                success:true,
                message:'ok'
            }).status(200);

        }catch (e) {
            console.log(e);
            res.json({
                success:true,
                message:'ok'
            }).status(200);
        }
    },
    getCallback:async (req,res,next)=>{
        let code = req.query.code;
        await getCustomerAccessTokenFacebook(code).then((result)=>{
            console.log(result);
            res.json({
                access_token:result
            });
        }).catch((error)=>{
            console.log(error);
            res.json(error);
        });
    },
    postCallback:(req,res,next)=>{
        console.log(req.query.code);
        res.json({
            success:true
        });
    }
};