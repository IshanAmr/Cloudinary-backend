require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateJwt = (req, res, next) => {
     const token = req.header('Authorization')?.split(' ')[1];
     if(!token) return res.status(403).json({ message : "No token provided, authorization denied"});

     try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
     } catch (error) {
        return res.status(401).json({ message : "Unauthorized" });
     }
     next();
}

module.exports = { authenticateJwt };