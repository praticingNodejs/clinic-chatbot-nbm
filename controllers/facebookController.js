// let handleTextFacebook = require('../flatforms/facebook/handles/handleTextFacebook');
// let handlePostbackFacebook = require('../flatforms/facebook/handles/handlePostbackFacebook');
let getCustomerAccessTokenFacebook = require('../flatforms/facebook/process/getCustomerAccessTokenFacebook');

let sendTextFacebook = require('../flatforms/facebook/process/sendTextFacebook');


let classifier = require('../training/classifier');

let users = [
    { id: null, name: null, phone: null, dateOfBirth: null, gender: null }
];
let sessions = [
    { user_id: null, question_id: null }
];
let books = [
    { user_id: null, reason: null, date: null, time: null, status: null }
];

let questions = [
    { id: 1, content: "Xin chào tôi có thể giúp gì cho bạn!?", index: 0, template_id: 0 },

    { id: 2, content: "Cập nhật lịch khám bạn hãy xóa lịch hiện tại", index: 0, template_id: 1 },

    { id: 4, content: "Bạn chắc chắn muốn hủy lịch hẹn?", index: 0, template_id: 2 },

    { id: 5, content: "Họ tên?", index: 0, template_id: 3, name: "getName" },
    { id: 6, content: "Số điện thoại?", index: 1, template_id: 3, name: "getPhone" },
    { id: 7, content: "Lý do khám (triệu chứng)?", index: 2, template_id: 3, name: "getReason" },
    { id: 8, content: "Ngày hẹn?", index: 3, template_id: 3, name: "getDate" },
    { id: 9, content: "Giờ hẹn?", index: 4, template_id: 3, name: "getTime" },

    { id: 10, content: "Họ tên?", index: 0, template_id: 4, name: "getName" },
    { id: 11, content: "Số điện thoại?", index: 1, template_id: 4, name: "getPhone" },
    { id: 12, content: "Năm sinh", index: 2, template_id: 4 },
    { id: 13, content: "Giới tính", index: 3, template_id: 4 },
    { id: 14, content: "Liên hệ 09xxxxxxx", index: 0, template_id: 5 },
];

let templates = [
    { id: 0, category: "greeting" },
    { id: 1, category: "update" },
    { id: 2, category: "cancel" },
    { id: 3, category: "book" },
    { id: 4, category: "infoUser" },
    { id: 5, category: "assistant" },
];

let handlePostbackFacebook = async(user_id, payload) => {

};

let findUser = (id) => {
    console.log("findUser");
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return i;
        }
    }
    return -1;
};

let getSession = (user_id) => {
    console.log("getSession");
    for (let i = 0; i < sessions.length; i++) {
        if (sessions[i].user_id === user_id) {
            return sessions[i];
        }
    }
    return null;
};

let getTemplateIdByCategory = (category) => {
    console.log("getTemplateIdByCategory");
    for (let i = 0; i < templates.length; i++) {
        if (category === templates[i].category) {
            return templates[i].id;
        }
    }
    return null;
};

let getTemplateIdByQuestionId = (question_id) => {
    for (let i = 0; i < questions.length; i++) {
        if (question_id === questions[i].id) {
            return questions[i].template_id;
        }
    }
    return null;
};

let getQuestionsOfTemplate = (template_id) => {
    let ql = [];
    console.log("getQuestionsOfTemplate");
    for (let i = 0; i < questions.length; i++) {
        if (template_id === questions[i].template_id) {
            ql.push(questions[i]);
        }
    }
    return ql;
};

let getNextQuestionId = (template_id, question_id) => {
    console.log("getNextQuestionId");
    let questionsOfTemplate = getQuestionsOfTemplate(template_id);
    for (let i = 0; i < questionsOfTemplate.length; i++) {
        if (questionsOfTemplate[i].id === question_id) {
            if (i === questionsOfTemplate.length - 1) {
                return null;
            } else {
                return questionsOfTemplate[i + 1].id;
            }
        }
    }
    return null;
};

let setSession = (user_id, question_id) => {
    console.log("setSession");
    for (let i = 0; i < sessions.length; i++) {
        if (sessions[i].user_id === user_id) {
            sessions[i].question_id = question_id;
        }
    }
};
let getQuestion = (question_id) => {
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].id === question_id) {
            return questions[i];
        }
    }
    return null;
};

let sessionManager = (user_id, question) => {
    let category = classifier(question);
    let template_id = getTemplateIdByCategory(category);
    let questionsOfTemplate = getQuestionsOfTemplate(template_id);
    let current_session = getSession(user_id);

    if (current_session === null) {
        sessions.push(user_id, questionsOfTemplate[0].id);
    } else {
        getNextQuestionId(template_id, current_session.question_id);
    }
};
let getCategoryByTemplateId = (template_id) => {
    for (let i = 0; i < templates.length; i++) {
        if (templates[i].id === template_id) {
            return templates[i].category;
        }
    }
    return null;
};

let messageReply = async(access_token, user_id, category, messageMore) => {
    let message = '';
    switch (category) {
        case 'assistant':
            return;
        case 'update':
            message = 'Bạn cập nhật lịch thành công';
            break;
        case 'cancel':
            message = 'Bạn đã hủy lịch hẹn khám thành công';
            break;
        case 'book':
            message = 'Bạn đặt lịch hẹn thành công';
            break;
        default:
            break;

    }
    await sendTextFacebook(access_token, user_id, message).then().catch();
};





module.exports = {
    getWebhook: (req, res, next) => {
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
        } else {
            res.sendStatus(403);
        }
    },
    postWebhook: async(req, res, next) => {
        console.log(JSON.stringify(req.body));
        res.json({
            success: true,
            message: 'ok'
        }).status(200);
        try {
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
            let quick_reply = messaging[0].quick_reply;

            if (findUser(sender_id) === -1) {
                users.push({ id: sender_id, name: null, phone: null, dateOfBirth: null, gender: null });
                sessions.push({ user_id: sender_id, question_id: null });
            }
            let current_session = getSession(sender_id);
            if (message) {
                if (message.text !== null && message.text !== undefined) {
                    let text = message.text;
                    if (current_session.question_id === null) {
                        let category = classifier(text);
                        console.log(category);
                        if (category === null || category === undefined) {
                            await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Tôi không hiểu, bạn có thể nói rõ hơn được không?');
                        } else {
                            let templateId = getTemplateIdByCategory(category);
                            let questionsOfTemplate = getQuestionsOfTemplate(templateId);
                            await setSession(sender_id, questionsOfTemplate[0].id);
                            if (getNextQuestionId(templateId, current_session.question_id) === null) {
                                setSession(sender_id, null);
                            }
                            sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, questionsOfTemplate[0].content);
                        }
                    } else {
                        let templateId = getTemplateIdByQuestionId(current_session.question_id);
                        let category = getCategoryByTemplateId(templateId);
                        let nextQuestionId = getNextQuestionId(templateId, current_session.question_id);
                        console.log({ templateId: templateId, category: category, nextQuestionId: nextQuestionId });
                        let question = getQuestion(nextQuestionId);
                        if (question !== null) {
                            await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, question.content);
                            setSession(sender_id, question.id);
                        } else {
                            await setSession(sender_id, null);
                            messageReply(process.env.FB_ACCESS_TOKEN, sender_id, category);
                        }
                    }
                }
            } else if (postback) {
                let title = postback.title;
                let payload = JSON.parse(postback.payload);
                await handlePostbackFacebook(sender_id, payload);
            }
            console.log(sessions);
        } catch (e) {
            console.log(e);
            res.json({
                success: true,
                message: 'ok'
            }).status(200);
        }
    },
    getCallback: async(req, res, next) => {
        let code = req.query.code;
        await getCustomerAccessTokenFacebook(code).then((result) => {
            console.log(result);
            res.json({
                access_token: result
            });
        }).catch((error) => {
            console.log(error);
            res.json(error);
        });
    },
    postCallback: (req, res, next) => {
        console.log(req.query.code);
        res.json({
            success: true
        });
    }
};