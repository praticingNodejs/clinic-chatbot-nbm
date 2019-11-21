module.exports = (text,buttons) =>{
    return {
        payload:{
            template_type: 'button',
            text : text,
            buttons : buttons
        }
    }
};