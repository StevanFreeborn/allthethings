const User = require('../models/user');

const UserController = require('../controllers/users');
const userController = new UserController();

const verifyJWT = require('../middleware/authorize');

module.exports = (app) => {

    // register new user
    app.post('/users/register', userController.register);

    // login user
    app.post('/users/login', userController.login);

    // logout user
    app.post('/users/logout', verifyJWT, userController.logout);    

    // check if user has logged in
    app.get('/users/auth', verifyJWT, userController.checkAuthStatus);

}