const mongoose = require('mongoose');

const userSchemaOptions = {
    timestamps: true
}

const UserSchema = mongoose.Schema({

    username: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true }

}, userSchemaOptions);

const User = mongoose.model('users', UserSchema);

module.exports = User;