const Task = require('../models/task');

class TasksController {

    getAllTasks = async (req, res) => {

        const userId = req.user.id;

        try {

            const tasks = await Task.find({userId: userId}).exec();
    
            return res.status(200).json(tasks);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to get tasks' });
            
        }
    
    }

    getTaskById = async (req, res) => {

        const taskId = req.params.id;

        try {

            const task = await Task.findById(taskId).exec();
    
            return res.status(200).json(task);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to get task' });
            
        }
    
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
        .catch(error => {
            
            console.log(error);

            return res.status(500).json({ error: 'Unable to add task' });

        });
    
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

        try {

            const updatedTask = await Task.findByIdAndUpdate(taskId, updates, updateOptions).exec();
    
            return res.status(200).json(updatedTask);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to update task' });
            
        }
    
    }

    completeTask = async (req, res) => {

        const taskId = req.params.id;

        const updates = {
            complete: true
        }
    
        const updateOptions = {new: true};

        try {

            const updatedTask = await Task.findByIdAndUpdate(taskId, updates, updateOptions).exec();

            return res.status(200).json(updatedTask);

        }
        catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to complete task' });

        }

    }

    deleteTaskById = async (req, res) => {

        const taskId = req.params.id;

        try {

            const deletedTask = await Task.findByIdAndDelete(taskId).exec();

            return res.status(204).json(deletedTask);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to delete task' });
            
        }

    }

}

module.exports = TasksController;