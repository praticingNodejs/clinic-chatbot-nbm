module.exports = (title, payload) => {
    return {
        "content_type": "text",
        "title": title,
        "payload": JSON.stringify(payload)
            // "image_url":"http://example.com/img/red.png"
    }
};