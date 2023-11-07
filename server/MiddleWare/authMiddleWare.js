const jwt = require('jsonwebtoken');

module.exports.authenticate= async(req, res)=>{
    console.log("landed on auth");

    const authorization = req.body.headers.authorization;
    const token = authorization.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECTET_KEY);
        const {userName, email, id, image, age} = decoded.user;
        res.json({userName: userName, email: email, id: id, image: image, age: age});
    }catch(err){
        res.status(401).json({message: 'Invalid token'});
    }
}