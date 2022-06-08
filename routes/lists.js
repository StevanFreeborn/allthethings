const ListsController = require('../controllers/lists');
const listController = new ListsController();

const verifyJWT = require('../middleware/authorize');

module.exports = (app) => {

    // get a list of all the lists
    app.get('/api/lists', verifyJWT, listController.getAllLists);

    // get all tasks for a list
    app.get('/api/lists/:id/tasks', verifyJWT, listController.getListTasks)

    // get a list by id
    app.get('/api/lists/:id', verifyJWT, listController.getListById);

    // add a list
    app.post('/api/lists/add', verifyJWT, listController.addList);

    // update a list by id
    app.post('/api/lists/update/:id', verifyJWT, listController.updateListById);

    // delete a list by id
    app.delete('/api/lists/delete/:id', verifyJWT, listController.deleteListById);

}