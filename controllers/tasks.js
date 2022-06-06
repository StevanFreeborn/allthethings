const Task = require('../models/task');

class TasksController {

    getAllTasks = async (req, res) => {

        const tasks = await Task.find({}).exec().catch(err => console.log(err));
    
        return res.status(200).json(tasks);
    
    }

    getTaskById = async (req, res) => {

        const taskId = req.params.id;
    
        const task = await Task.findById(taskId).exec().catch(err => console.log(err));
    
        return res.status(200).json(task);
    
    }

    addTask = async (req, res) => {

        console.log(req.user);

        const newTask = new Task({
    
            name: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate,
    
        });
    
        newTask.save()
        .then(task => res.status(201).json(task))
        .catch(err => console.log(err));
    
    }

    updateTaskById = async (req, res) => {

        const taskId = req.params.id;
    
        const updates = {
            name: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate
        }
    
        const updateOptions = {new: true};
    
        const updatedTask = await Task.findByIdAndUpdate(taskId, updates, updateOptions).catch(err => console.log(err));
    
        return res.status(200).json(updatedTask);
    
    }

    deleteTaskById = async (req, res) => {

        const taskId = req.params.id;

        const deletedTask = await Task.findByIdAndDelete(taskId).exec().catch(err => console.log(err));

        return res.status(204).json(deletedTask);

    }

}

module.exports = TasksController;