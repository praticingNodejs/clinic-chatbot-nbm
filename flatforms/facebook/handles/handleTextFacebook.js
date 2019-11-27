let sendButtonsTemplateFacebook = require('../process/sendButtonsTemplateFacebook');
let buttonTemplateFacecbook = require('../templates/buttonTemplateFacebook');
let classifier = require('../../../training/classifier');
module.exports = async (page_id,user_id,text) =>{
    let category = classifier(text);
    let buttons = [
    ];
    if (category === 'greeting'){
    //    buttons.push(buttonTemplateFacecbook("web_url","Đặt lịch khám","https://google.com"));
        buttons.push(buttonTemplateFacecbook("postback","Đặt lịch",{'category':'book'}));
        buttons.push(buttonTemplateFacecbook("postback","Tư vấn",{'category':'assistant'}));
        console.log(buttons);
        await sendButtonsTemplateFacebook(page_id,user_id,'Phòng khám',buttons);
    }
};