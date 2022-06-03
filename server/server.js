require('dotenv').config({path: './config.env'});

import express from 'express';

const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

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

