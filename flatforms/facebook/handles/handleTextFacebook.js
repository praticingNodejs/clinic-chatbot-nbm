let sendButtonsTemplateFacebook = require('../sendButtonsTemplateFacebook');
let buttonTemplateFacecbook = require('../templates/buttonTemplateFacebook');
module.exports = async (user_id,text) =>{
    let buttons = [
    ];
    if (text === 'test'){
    //    buttons.push(buttonTemplateFacecbook("web_url","Đặt lịch khám","https://google.com"));
        buttons.push(buttonTemplateFacecbook("postback","Đặt lịch",{'category':'book'}));
        buttons.push(buttonTemplateFacecbook("postback","Tư vấn",{'category':'assistant'}));
        console.log(buttons);
        await sendButtonsTemplateFacebook(process.env.FB_ACCESS_TOKEN,user_id,'Phòng khám',buttons);
    }
};