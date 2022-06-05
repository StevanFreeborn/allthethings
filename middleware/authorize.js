const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {

    const token = req.headers['x-access-token']?.split(' ')[1];

    if (!token) return res.status(400).json({ error: 'Invalid token', isLoggedIn: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {

        id: decoded.id,
        username: decoded.username,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email

    };

    next();

}

module.exports = verifyJWT;