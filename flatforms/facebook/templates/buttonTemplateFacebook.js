module.exports = (type, title, data) => {
    if (type === "postback") {
        return {
            type: type,
            title: title,
            payload: JSON.stringify(data)
        }
    } else if (type === "web_url") {
        return {
            type: type,
            title: title,
            url: data
        }
    } else {
        return 1;
    }
};