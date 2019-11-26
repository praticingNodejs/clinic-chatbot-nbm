let sendTextFacebook = require('../process/sendTextFacebook');
module.exports =async (page_id,user_id,payload)=> {
    let category = payload.category;
    switch (category) {
        case 'bookSchedule':{
            break;
        }
        case 'updateSchedule':{
            break;
        }
        case 'cancelSchedule':{
            break;
        }
        case 'readSchedule':{

            break;
        }
        case 'updateProfile':{

            break;
        }
        case 'deleteProfile':{

            break;
        }
        case 'readProfile':{

            break;
        }
        case 'assistant':{

            break;
        }
        default:{

            break;
        }
    }
};