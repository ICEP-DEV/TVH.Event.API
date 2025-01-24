const jwt = require('jsonwebtoken');



let secret_key = "26a8VsKC7m65GCT1GWPMQ8l5IBf0kMdQqMD2qMFfLX251wO96qjLfKAXvhDu7y8Q"



const authMiddleware = (req, res, next) =>{
    const authHeader = req.headers['token']; 


    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];


    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, secret_key); 
        req.user = decoded.userID;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};




module.exports = {
    authMiddleware,
    secret_key
}

