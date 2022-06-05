const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verifyJWT = require('../middleware/authorize');

module.exports = (app) => {

    // register new user
    app.post('/users/register', async (req, res) => {

        const username = req.body.username;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        let password = req.body.password;

        // check database if user already exists with entered username or email
        const existingUsername = await User.findOne({ username: username }).exec().catch(err => console.log(err));
        const existingEmail = await User.findOne({ email: email }).exec().catch(err => console.log(err));

        // if user does already exist with username or email return error
        if (existingUsername || existingEmail) return res.status(400).json({ error: 'Invalid username or email' });

        // hash entered password before create new user
        password = await bcrypt.hash(password, 10).catch(err => console.log(err));

        // create new user
        const newUser = new User({

            username: username,
            firstName: firstName,
            lastName: lastName,
            email: lastName,
            password: password

        });

        // save user
        newUser.save()
        .then(user => res.status(201).json(user))
        .catch(err => console.log(err));

    });


    app.post('/users/login', async (req, res) => {

        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({ username: username }).exec().catch(err => console.log(err));

        if (!user) return res.status(400).json({ error: 'Invalid username or password' });

        const userPassword = user.password;

        const correctPassword = await bcrypt.compare(password, userPassword).catch(err => console.log(err));

        if (!correctPassword) return res.status(400).json({ error: 'Invalid username or password' });

        const resBody = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        }

        const jwtTokenOptions = { expiresIn: 86400 };

        let jwtToken = `Bearer ${jwt.sign(resBody, process.env.JWT_SECRET, jwtTokenOptions)}`;  

        return res.status(200).json({ token: jwtToken });

    });

    app.get('/users/getUsername', verifyJWT, (req, res) => {

        return res.status(200).json({ isLoggedIn: true, username: req.user.username });

    });

}