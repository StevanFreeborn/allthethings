const TaskController = require('../controllers/tasks');
const taskController = new TaskController();

const verifyJWT = require('../middleware/authorize');

module.exports = (app) => {

    // get a list of all the tasks.
    app.get('/api/tasks', verifyJWT, taskController.getAllTasks);

    // get a task by id.
    app.get('/api/tasks/:id', verifyJWT, taskController.getTaskById);

    // add a task
    app.post('/api/tasks/add', verifyJWT, taskController.addTask);

    // update a task by id
    app.post('/api/tasks/update/:id', verifyJWT, taskController.updateTaskById);

    // mark task complete by id
    app.post('/api/tasks/complete/:id', verifyJWT, taskController.completeTask);

    // delete a task by id
    app.delete('/api/tasks/delete/:id', verifyJWT, taskController.deleteTaskById);

}