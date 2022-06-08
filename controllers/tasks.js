const Task = require('../models/task');

class TasksController {

    getAllTasks = async (req, res) => {

        const userId = req.user.id;

        const tasks = await Task.find({userId: userId}).exec().catch(err => console.log(err));
    
        return res.status(200).json(tasks);
    
    }

    getTaskById = async (req, res) => {

        const taskId = req.params.id;
    
        const task = await Task.findById(taskId).exec().catch(err => console.log(err));
    
        return res.status(200).json(task);
    
    }

    addTask = async (req, res) => {

        const userId = req.user.id;

        const newTask = new Task({
            
            userId: userId,
            listId: req.body.listId,
            listName: req.body.listName,
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
            listId: req.body.listId,
            listName: req.body.listName,
            name: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate
        }
    
        const updateOptions = {new: true};
    
        const updatedTask = await Task.findByIdAndUpdate(taskId, updates, updateOptions).exec().catch(err => console.log(err));
    
        return res.status(200).json(updatedTask);
    
    }

    deleteTaskById = async (req, res) => {

        const taskId = req.params.id;

        const deletedTask = await Task.findByIdAndDelete(taskId).exec().catch(err => console.log(err));

        return res.status(204).json(deletedTask);

    }

}

module.exports = TasksController;