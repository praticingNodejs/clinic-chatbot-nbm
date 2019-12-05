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

    { id: 3, content: "Hệ thống đang kiểm tra lịch khám của bạn", index: 0, template_id: 6 },

    { id: 4, content: "Bạn chắc chắn muốn hủy lịch hẹn?", index: 0, template_id: 2 },

    { id: 5, content: "Ý bạn là đặt lịch có phải không? ('có' hoặc 'không')", index: 0, template_id: 3, name: "confirm" },
    { id: 6, content: "Để đặt lịch khám, tôi sẽ lấy một vài thông tin của bạn (bạn có thể gõ 'thoát' để dừng việc đăng ký!! Họ tên của bạn là gì?", index: 1, template_id: 3, name: "getName" },
    { id: 7, content: "Số điện thoại của bạn?", index: 2, template_id: 3, name: "getPhone" },
    { id: 8, content: "Lý do khám (triệu chứng)?", index: 3, template_id: 3, name: "getReason" },
    { id: 9, content: "Ngày hẹn? (Định dạng ngày/tháng/năm, vd: 01/01/2020)", index: 4, template_id: 3, name: "getDate" },
    { id: 10, content: "Giờ hẹn? (Định dạng giờ:phút, vd: 00:00)", index: 5, template_id: 3, name: "getTime" },
    { id: 11, content: "Cảm ơn bạn vì đã điền đầy đủ thông tin!!", index: 6, template_id: 3, name: 'getConfirm' },

    { id: 12, content: "Họ tên?", index: 0, template_id: 4, name: "getName" },
    { id: 13, content: "Số điện thoại?", index: 1, template_id: 4, name: "getPhone" },
    { id: 14, content: "Năm sinh", index: 2, template_id: 4 },
    { id: 15, content: "Giới tính", index: 3, template_id: 4 },

    { id: 16, content: "Đây là chương trình chatbot dành cho người bệnh đặt phòng khám. Người dùng có thể đặt lịch cho phòng khám, hủy lịch hoặc kiểm tra lịch đã đặt trong phòng khám bằng những câu lệnh như 'Tôi muốn đặt phòng khám', 'Hủy lịch khám' hoặc 'Kiểm tra lịch khám'...", index: 0, template_id: 5 },
];

let templates = [
    { id: 0, category: "greeting" },
    { id: 1, category: "update" },
    { id: 2, category: "cancel" },
    { id: 3, category: "book" },
    { id: 4, category: "infoUser" },
    { id: 5, category: "assistant" },
    { id: 6, category: "check" }
];

let handlePostbackFacebook = async(user_id, payload) => {

};

let findOrCreateBook = (user_id) => {
    console.log(books)
    let check = -1;
    for (let i = 0; i < books.length; i++) {
        if (books[i].user_id == user_id) {
            check = i
            return i;

        }
    }
    if (check === -1) {
        books.push({ user_id: user_id, reason: null, date: null, time: null, status: null });
        console.log(books)
        return books.length - 1;
    }
}

let findUser = (id) => {
    console.log("findUser");
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return i;
        }
    }
    return -1;
};
let findBook = (user_id) => {
    for (let i = 0; i < books.length; i++) {
        if (books[i].user_id === user_id) {
            return i;
        }
    }
    return null;
}

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

let compareDate = (date) => {
    //get current date
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    today = today.split("/");
    let currentDate = new Date(today[2], today[1], today[0]);
    date = date.split("/");
    let scheduleDate = new Date(date[2], date[1], date[0]);

    console.log(`Today: ${today} and Date: ${date}`)

    if (currentDate.getTime() < scheduleDate.getTime()) {
        return true
    } else {
        return false
    }
}

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
                            if (category === 'cancel') {
                                console.log('Đã vào cancel')
                                setSession(sender_id, questionsOfTemplate[0].id)
                            }
                            await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, questionsOfTemplate[0].content);
                            if (category === 'check') {
                                if (books[findBook(sender_id)]) {
                                    await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Dưới đây là lịch khám của bạn')
                                    let user = users[findUser(sender_id)];
                                    let book = books[findBook(sender_id)];
                                    let raw = `Người khám: ${user.name}. Số điện thoại: ${user.phone}. Lý do khám: ${book.reason}. Thời gian: ${book.time} ${book.date}`;
                                    await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, raw);
                                } else {
                                    await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Không tồn tại lịch khám nào, vui lòng kiểm tra lại!!');
                                }
                                setSession(sender_id, null);
                            }
                        }
                    } else {
                        let templateId = getTemplateIdByQuestionId(current_session.question_id);
                        let category = getCategoryByTemplateId(templateId);
                        let nextQuestionId = getNextQuestionId(templateId, current_session.question_id);
                        console.log({ templateId: templateId, category: category, nextQuestionId: nextQuestionId });
                        let currentQuestion = getQuestion(current_session.question_id);
                        let question = getQuestion(nextQuestionId);
                        if (question !== null) {
                            switch (category) {
                                case 'book':
                                    if (currentQuestion.name === 'confirm') {
                                        if (message.text.toLowerCase() === 'có') {
                                            await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, question.content);
                                            setSession(sender_id, nextQuestionId);
                                        } else if (message.text.toLowerCase() === 'không' || message.text.toLowerCase() === 'ko') {
                                            await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Việc đăng ký đã được dừng lại!! Xin lỗi vì có thể tôi vô tình hiểu sai ý bạn :3');
                                            setSession(sender_id, null);
                                        } else {
                                            await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Bạn nên trả lời có hoặc không!!!');
                                            await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, currentQuestion.content);
                                        }
                                    } else if (currentQuestion.name === 'getName') {
                                        console.log(`name: ${message.text}`)
                                        if (message.text.toLowerCase() === 'thoát') {
                                            setSession(sender_id, null);
                                            await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Việc đăng ký lịch đã được tạm ngừng!! ');
                                        } else {
                                            name = message.text;
                                            users[findUser(sender_id)].name = name;
                                            console.log(nextQuestionId)
                                            setSession(sender_id, nextQuestionId);
                                            await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, question.content);
                                        }
                                    } else if (currentQuestion.name === 'getPhone') {
                                        if (message.text.match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/g) === null) {
                                            if (message.text.toLowerCase() === 'thoát') {
                                                users[findUser(sender_id)].name = null;
                                                setSession(sender_id, null);
                                                await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Việc đăng ký lịch đã được tạm ngừng!! ');
                                            } else {
                                                await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Định dạng dữ liệu cho số điện thoại bị sai, vui lòng nhập lại!!');
                                                await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, currentQuestion.content);
                                            }
                                        } else {
                                            let phone = message.text;
                                            users[findUser(sender_id)].phone = phone;
                                            setSession(sender_id, question.id);
                                            await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, question.content);
                                        }
                                    } else if (currentQuestion.name === 'getReason') {
                                        if (message.text.toLowerCase() === 'thoát') {
                                            setSession(sender_id, null);
                                            await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Việc đăng ký lịch đã được tạm ngừng!! ');
                                        } else {
                                            let reason = message.text;
                                            console.log(`Reason: ${reason}`)
                                            books[findOrCreateBook(sender_id)].reason = reason;
                                            setSession(sender_id, question.id);
                                            await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, question.content);
                                        }
                                    } else if (currentQuestion.name === 'getDate') {
                                        if (message.text.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/g) === null) {
                                            if (message.text.toLowerCase() === 'thoát') {
                                                books = books.splice(books[findBook(sender_id)], 1);
                                                setSession(sender_id, null);
                                                await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Việc đăng ký lịch đã được tạm ngừng!! ');
                                            } else {
                                                sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Ngày tháng năm bị sai, vui lòng điền theo đúng định dạng ngày/tháng/năm');
                                                await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, currentQuestion.content);
                                            }
                                        } else {
                                            let date = message.text;
                                            if (compareDate(date) === true) {
                                                books[findOrCreateBook(sender_id)].date = date;
                                                setSession(sender_id, question.id);
                                                await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, question.content);
                                            } else {
                                                sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Lịch hiện tại đã vượt qua lịch đặt của bạn, xin vui lòng điền lại ngày hẹn!!');
                                                await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, currentQuestion.content);
                                            }
                                        }
                                    } else if (currentQuestion.name === 'getTime') {
                                        if (message.text.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/g) === null) {
                                            if (message.text.toLowerCase() === 'thoát') {
                                                books = books.splice(books[findBook(sender_id)], 1);

                                                setSession(sender_id, null);
                                                await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Việc đăng ký lịch đã được tạm ngừng!! ');
                                            } else {
                                                await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Thời gian bị sai, vui lòng điền theo định dạng Giờ:Phút (01:00)');
                                                await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, currentQuestion.content);
                                            }
                                        } else {
                                            let time = message.text;
                                            books[findOrCreateBook(sender_id)].time = time;
                                            setSession(sender_id, question.id);
                                            await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, question.content);
                                            setSession(sender_id, null)

                                            await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Dưới đây là lịch khám của bạn, vui lòng xác nhận thông tin!! Xin cảm ơn !!');
                                            let user = users[findUser(sender_id)];
                                            let book = books[findBook(sender_id)];
                                            let raw = `Người khám: ${user.name}. Số điện thoại: ${user.phone}. Lý do khám: ${book.reason}. Thời gian: ${book.time} ${book.date}`;
                                            await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, raw);
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                        } else {
                            if (category === 'cancel') {
                                if (message.text.toLowerCase() === 'có') {
                                    if (books[findBook(sender_id)]) {
                                        await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Hủy thành công');
                                        books = books.splice(books[findBook(sender_id)], 1);
                                        console.log(books)
                                    } else {
                                        await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Không thể hủy khi không có lịch khám, vui lòng kiểm tra lại');
                                    }
                                } else if (message.text.toLowerCase() === 'không' || message.text.toLowerCase() === 'ko') {
                                    if (books[findBook(sender_id)]) {
                                        await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Lịch khám vẫn còn tồn tại!! Tôi có thể hiểu sai ý bạn, thông cảm vì sự bất tiện này!!');
                                    } else {
                                        await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Không tồn tại lịch khám nên muốn bạn cũng không thể hủy đc :v Vui lòng đặt lịch khám để hủy <3');
                                    }
                                } else {
                                    await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, 'Bạn hãy nói rõ hơn về việc có nên dừng hủy hay không (có hoặc không).');
                                    await sendTextFacebook(process.env.FB_ACCESS_TOKEN, sender_id, questionsOfTemplate[0].content);
                                }
                                setSession(sender_id, null);
                            }
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