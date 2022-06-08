const mongoose = require('mongoose');

const taskSchemaOptions = {
    timestamps: true
}

const TaskSchema = mongoose.Schema({

    userId: { type: String },
    listId: { type: String },
    listName: { type: String },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    dueDate: { type: Date, required: true, trim: true }

}, taskSchemaOptions);

const Task = mongoose.model('tasks', TaskSchema);

module.exports = Task;