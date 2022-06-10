const Task = require('../models/task');

class TasksController {

    getAllTasks = async (req, res) => {

        const userId = req.user.id;

        if (!userId) return res.status(400).json({ error: 'Required field(s) missing' });

        try {

            const tasks = await Task.find({userId: userId}).exec();
    
            return res.status(200).json(tasks);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to get tasks' });
            
        }
    
    }

    getTaskById = async (req, res) => {

        const userId = req.user.id;
        const taskId = req.params.id;

        if (!userId || !taskId) return res.status(400).json({ error: 'Required field(s) missing' });

        const query = {
            userId: userId,
            _id: taskId
        };

        try {

            const task = await Task.findOne(query).exec();
    
            return res.status(200).json(task);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to get task' });
            
        }
    
    }

    addTask = async (req, res) => {

        const userId = req.user.id;
        const name = req.body.name;
        const description = req.body.description;
        const dueDate = req.body.dueDate;

        if (!userId || !name || !description || !dueDate) return res.status(400).json({ error: 'Required field(s) missing' });

        const newTask = new Task({
            
            userId: userId,
            listId: req.body.listId,
            listName: req.body.listName,
            name: name,
            description: description,
            dueDate: dueDate,
    
        });
    
        newTask.save()
        .then(task => res.status(201).json(task))
        .catch(error => {
            
            console.log(error);

            return res.status(500).json({ error: 'Unable to add task' });

        });
    
    }

    updateTaskById = async (req, res) => {

        const userId = req.user.id;
        const taskId = req.params.id;
        const name = req.body.name;
        const description = req.body.description;
        const dueDate = req.body.dueDate;

        if (!userId || !taskId || !name || !description || !dueDate) return res.status(400).json({ error: 'Required field(s) missing' });
        
        const query = {
            userId: userId,
            _id: taskId
        };

        const updates = {
            listId: req.body.listId,
            listName: req.body.listName,
            name: name,
            description: description,
            dueDate: dueDate
        };
    
        const updateOptions = {new: true};

        try {

            const updatedTask = await Task.findOneAndUpdate(query, updates, updateOptions).exec();
    
            return res.status(200).json(updatedTask);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to update task' });
            
        }
    
    }

    completeTask = async (req, res) => {

        const userId = req.user.id;
        const taskId = req.params.id;

        if (!userId || !taskId) return res.status(400).json({ error: 'Required field(s) missing' });

        const query = {
            userId: userId,
            _id: taskId
        };

        const updates = {
            complete: true
        };
    
        const updateOptions = {new: true};

        try {

            const updatedTask = await Task.findOneAndUpdate(query, updates, updateOptions).exec();

            return res.status(200).json(updatedTask);

        }
        catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to complete task' });

        }

    }

    deleteTaskById = async (req, res) => {

        const userId = req.user.id;
        const taskId = req.params.id;

        if (!userId || !taskId) return res.status(400).json({ error: 'Required field(s) missing' });

        const query = {
            userId: userId,
            _id: taskId
        };

        try {

            const deletedTask = await Task.findOneAndDelete(query).exec();

            return res.status(204).json(deletedTask);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to delete task' });
            
        }

    }

}

module.exports = TasksController;