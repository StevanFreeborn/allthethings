const User = require('../models/user');

const UserController = require('../controllers/users');
const userController = new UserController();

const verifyJWT = require('../middleware/authorize');

module.exports = (app) => {

    // register new user
    app.post('/api/users/register', userController.register);

    // login user
    app.post('/api/users/login', userController.login);

    // check if user has logged in
    app.get('/api/users/auth', verifyJWT, userController.checkAuthStatus);

    // get user information
    app.get('/api/users/user', verifyJWT, userController.getUserById);

    // update user information
    app.post('/api/users/update', verifyJWT, userController.updateUserById);

}