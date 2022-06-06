const Task = require('../models/task');

const TaskController = require('../controllers/tasks');
const taskController = new TaskController();

module.exports = (app) => {

    // get a list of all the tasks.
    app.get('/tasks', taskController.getAllTasks);

    // get a task by id.
    app.get('/tasks/:id', taskController.getTaskById);

    // add a task record
    app.post('/tasks/add', taskController.addTask);

    // update a task by id
    app.post('/tasks/update/:id', taskController.updateTaskById);

    // delete task by id
    app.delete('/tasks/delete/:id', taskController.deleteTaskById);

}