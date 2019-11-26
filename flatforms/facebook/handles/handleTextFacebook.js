let sendButtonsTemplateFacebook = require('../process/sendButtonsTemplateFacebook');
let buttonTemplateFacecbook = require('../templates/buttonTemplateFacebook');
module.exports = async (page_id,user_id,text) =>{
    let buttons = [
    ];
    if (text === 'test'){
    //    buttons.push(buttonTemplateFacecbook("web_url","Đặt lịch khám","https://google.com"));
        buttons.push(buttonTemplateFacecbook("postback","Đặt lịch",{'category':'book'}));
        buttons.push(buttonTemplateFacecbook("postback","Tư vấn",{'category':'assistant'}));
        console.log(buttons);
        await sendButtonsTemplateFacebook(page_id,user_id,'Phòng khám',buttons);
    }
};