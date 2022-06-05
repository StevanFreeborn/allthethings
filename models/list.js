const mongoose = require('mongoose');

const listSchemaOptions = {
    timestamps: true
}

const ListSchema = mongoose.Schema({

    userId: { type: String },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

}, listSchemaOptions);

const List = mongoose.model('lists', ListSchema);

module.exports = List;