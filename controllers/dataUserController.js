module.exports = {
    post : (req,res,next)=>{
        console.log(JSON.stringify(req.body));
        res.json(req.body);
    }
};