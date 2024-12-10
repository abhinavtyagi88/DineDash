const jwt = require('jsonwebtoken');
const JWT_SECRET = 'HaHa'; // Replace with your secret

const fetchjwt = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access Denied: No token provided' });
    }
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        console.log("NOT FOUND");
        req.user = verified; // Attach user data
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: 'Invalid Token' });
    }
};

module.exports = fetchjwt;
