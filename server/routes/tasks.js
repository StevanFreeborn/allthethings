import List from '../models/list';
import Task from '../models/task';

module.exports = (app) => {

    // get a list of all the tasks.
    app.route('/tasks').get(async (req, res) => {

        const tasks = await Task.find({}).exec().catch(err => console.log(err));

        return res.status(200).json(tasks);

    });

    // get a task by id.
    app.route('/tasks/:id').get(async (req, res) => {

        const taskId = req.params.id;

        const task = await Task.findById(taskId).exec().catch(err => console.log(err));

        return res.status(200).json(task);

    });

    // add a task record
    app.route('/tasks/add').post(async (req, res) => {

        const newTask = new Task({

            name: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate,

        });

        newTask.save()
        .then(task => res.status(201).json(task))
        .catch(err => console.log(err));

    });

    // update a task by id
    app.route('/tasks/update/:id').post(async (req, res) => {

        const taskId = req.params.id;

        const updates = {
            name: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate
        }

        const updateOptions = {new: true};

        const updatedTask = await Task.findByIdAndUpdate(taskId, updates, updateOptions).catch(err => console.log(err));

        return res.status(200).json(updatedTask);

    });

    // delete task by id
    app.route('/tasks/delete/:id').delete(async (req, res) => {

        const taskId = req.params.id;

        const deletedTask = await Task.findByIdAndDelete(taskId).exec().catch(err => console.log(err));

        return res.status(204).json(deletedTask);

    });

}