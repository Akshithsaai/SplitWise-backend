const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization || '';
        jwt.verify(token, process.env.JWT_KEY || '');
        // req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Session expired',
            status: 401
        });
    }
};

module.exports =  checkAuth;