const User = require('../models/user');

const UserController = require('../controllers/users');
const userController = new UserController();

const verifyJWT = require('../middleware/authorize');

module.exports = (app) => {

    // register new user
    app.post('/users/register', userController.register);

    app.post('/users/login', userController.login);

    // temp route for testing verifyJWT middleware works correctly
    app.get('/users/getUsername', verifyJWT, (req, res) => {

        return res.status(200).json({ isLoggedIn: true, username: req.user.username });

    });

}