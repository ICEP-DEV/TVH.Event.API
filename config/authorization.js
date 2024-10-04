const jwt = require('jsonwebtoken');

let secret_key = "26a8VsKC7m65GCT1GWPMQ8l5IBf0kMdQqMD2qMFfLX251wO96qjLfKAXvhDu7y8Q";


const verifyToken = (req, res, next) =>{
    const token = req.header('token')?.split(' ')[1]

    if(!token){
        return res.status(403).json({ message: 'Access Denied, No token provided' });
    }

    try{
        const verified = jwt.verify(token, secret_key);
        req.user = verified;
        next();
    }
    catch(error){
        res.status(401).json({ message: 'Invalid Token' });
    }
}

module.exports = {
    verifyToken,
    secret_key
}