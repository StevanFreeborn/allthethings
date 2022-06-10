const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {

    register = async (req, res) => {

        const { username, firstName, lastName, email } = req.body;
        let password = req.body.password;

        if (!username || !firstName || !lastName || !email || !password) return res.status(400).json({ error: 'Required field(s) missing' });

        try {

            // check database if user already exists with entered username or email
            const existingUsername = await User.findOne({ username: username }).exec();
            const existingEmail = await User.findOne({ email: email }).exec();

            // if user does already exist with username or email return error
            if (existingUsername || existingEmail) return res.status(400).json({ error: 'Invalid username or email' });

        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to register new user'});

        }
        
        try {

            // hash entered password before create new user
            password = await bcrypt.hash(password, 10);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to register new user'}); 
            
        }

        // create new user
        const newUser = new User({

            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password

        });

        // save user
        newUser.save()
        .then(user => {

            const newUser = {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                id: user.id
            }

            return res.status(201).json(newUser);
        
        })
        .catch(error => {

            console.log(error)

            return res.status(500).json({ error: 'Unable to register new user' })

        });

    }

    login = async (req, res) => {

        const { username, password } = req.body;

        if (!username || !password) return res.status(400).json({ error: 'Required field(s) missing' })

        try {

            // check if user with entered username exists
            const user = await User.findOne({ username: username }).exec();

            // if user with entered username does not exist return error.
            if (!user) return res.status(400).json({ error: 'Invalid username or password' });

            // get users hashed password
            const userPassword = user.password;

            // check if entered password matches users stored password
            const isCorrectPassword = await bcrypt.compare(password, userPassword);

            // if password is inccorect return error
            if (!isCorrectPassword) return res.status(400).json({ error: 'Invalid username or password' });

            // build user response object using users stored values
            const resBody = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }

            // set JWT token to expire in 86400 seconds or 1 day
            const jwtTokenOptions = { expiresIn: 86400 };

            // build jwtToken
            let jwtToken = `Bearer ${jwt.sign(resBody, process.env.JWT_SECRET, jwtTokenOptions)}`;

            // return jwtToken
            return res.status(200).json({ message: 'Login successful', token: jwtToken });

        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to login user' });

        }

    }

    checkAuthStatus = (req, res) => {
        
        return res.status(200).json({ isLoggedIn: true });
        
    }

    getUserById = async (req, res) => {

        const userId = req.user.id;

        if (!userId) return res.status(400).json({ error: 'Unable to get profile' });

        const query = {
            _id: userId
        };

        try {

            const user = await User.findOne(query).select('-password -createdAt -updatedAt -_id -__v').exec();
    
            return res.status(200).json(user);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to get task' });
            
        }

    }

    updateUserById = async (req, res) => {

        const userId = req.user.id;
        const { username, firstName, lastName, email } = req.body;

        if (!userId || !username || !firstName || !lastName || !email ) return res.status(400).json({ error: 'Required field(s) missing' });

        const query = {
            _id: userId
        };

        const updates = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email
        };
    
        const updateOptions = {new: true};

        try {

            const updatedUser = await User.findOneAndUpdate(query, updates, updateOptions).select('-password -createdAt -updatedAt -_id -__v').exec();

            return res.status(200).json(updatedUser);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to update task' });
            
        }



    }

}

module.exports = UserController;