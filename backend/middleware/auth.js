const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access Denied' });
    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SEC);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid Token' });
    }
};

exports.verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access Denied' });
    }
    next();
};

exports.verifySuperAdmin = (req, res, next) => {
    if (req.user.role !== 'superAdmin') {
        return res.status(403).json({ error: 'Access Denied' });
    }
    next();
};