require('dotenv').config({path: './config/config.env'});

const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const usersRoutes = require('./routes/users');
const tasksRoutes = require('./routes/tasks');
const listRoutes = require('./routes/lists');
const path = require('path');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const logger = morgan('dev');

app.use(logger);

usersRoutes(app);
tasksRoutes(app);
listRoutes(app);

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {

    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));

});

app.listen(port, () => {

    const connString = process.env.MONGO_URI;
    const connOptions = { useNewUrlParser: true, useUnifiedTopology: true };

    mongoose.connect(connString, connOptions)
    .then(() => {

        console.log('Mongoose connected successfully')

    })
    .catch(err => {

        console.log('Mongoose failed to connect.')
        console.log(err);

    });

    mongoose.connection.on('error', err => console.log(err));

    console.log(`Server is running on port: ${port}`);

});

