module.exports = (task, success, error) => {
    if (success) {
        console.log({
            task: task,
            success: success
        })
    } else {
        console.log({
            task: task,
            success: success,
            error: error
        })
    }
};