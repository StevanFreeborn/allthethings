const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {

    // get token from request header
    const token = req.cookies.jwt;

    // if no token return error
    if (!token) return res.status(403).json({ error: 'Unauthorized request', isLoggedIn: false });

    // verify token using verify() method from jsonwebtoken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // set user object values in request from decoded web token to be passed to next request.
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