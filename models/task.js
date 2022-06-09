const mongoose = require('mongoose');

const taskSchemaOptions = {
    timestamps: true
}

const TaskSchema = mongoose.Schema({

    userId: { type: String, required: true, trim: true },
    listId: { type: String },
    listName: { type: String },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    dueDate: { type: Date, required: true, trim: true },
    complete: { type: Boolean, default: false }

}, taskSchemaOptions);

const Task = mongoose.model('tasks', TaskSchema);

module.exports = Task;