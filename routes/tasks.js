const TaskController = require('../controllers/tasks');
const verifyJWT = require('../middleware/authorize');
const taskController = new TaskController();

module.exports = (app) => {

    // get a list of all the tasks.
    app.get('/tasks', verifyJWT, taskController.getAllTasks);

    // get a task by id.
    app.get('/tasks/:id', verifyJWT, taskController.getTaskById);

    // add a task record
    app.post('/tasks/add', verifyJWT, taskController.addTask);

    // update a task by id
    app.post('/tasks/update/:id', verifyJWT, taskController.updateTaskById);

    // delete task by id
    app.delete('/tasks/delete/:id', verifyJWT, taskController.deleteTaskById);

}