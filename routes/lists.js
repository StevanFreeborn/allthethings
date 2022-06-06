const ListsController = require('../controllers/lists');
const listController = new ListsController();

const verifyJWT = require('../middleware/authorize');

module.exports = (app) => {

    // get a list of all the lists.
    app.get('/lists', verifyJWT, listController.getAllLists);

    // get a list by id.
    app.get('/lists/:id', verifyJWT, listController.getListById);

    // add a list
    app.post('/lists/add', verifyJWT, listController.addList);

    // update a list by id
    app.post('/lists/update/:id', verifyJWT, listController.updateListById);

    // delete a list by id
    app.delete('/lists/delete/:id', verifyJWT, listController.deleteListById);

}