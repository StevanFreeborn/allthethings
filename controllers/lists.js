const List = require('../models/list');
const Task = require('../models/task');

class ListsController {

    getAllLists = async (req, res) => {

        const userId = req.user.id;

        try {

            const lists = await List.find({userId: userId}).exec();

            return res.status(200).json(lists);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to get lists' })
            
        }
    
    }

    getListTasks = async (req, res) => {

        const listId = req.params.id;

        try {

            const tasks = await Task.find({listId: listId}).exec();

            return res.status(200).json(tasks);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to get tasks for list' })
            
        }

    }

    getListById = async (req, res) => {

        const listId = req.params.id;

        try {

            const list = await List.findById(listId).exec();

            return res.status(200).json(list);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to get list' });
            
        }
    
    }

    addList = async (req, res) => {

        const userId = req.user.id;

        const newList = new List({
            
            userId: userId,
            name: req.body.name,
            description: req.body.description,
    
        });
    
        newList.save()
        .then(list => res.status(201).json(list))
        .catch(error => {

            console.log(error);

            return res.status(500).json({ error: 'Unable to add list' });

        });
    
    }

    updateListById = async (req, res) => {

        const listId = req.params.id;
    
        const updates = {
            name: req.body.name,
            description: req.body.description,
        }
    
        const updateOptions = {new: true};

        try {

            const updatedList = await List.findByIdAndUpdate(listId, updates, updateOptions).exec();

            const taskUpdates = await Task.updateMany({listId: updatedList.id}, {listName: updatedList.name}).exec();

            const listAndTaskUpdates = {
                updatedList: updatedList,
                taskUpdates: taskUpdates
            }

            return res.status(200).json(listAndTaskUpdates);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to update list' });
            
        }
    
    }

    deleteListById = async (req, res) => {

        const listId = req.params.id;

        try {

            const deletedList = await List.findByIdAndDelete(listId).exec();

            const taskUpdates = await Task.updateMany({listId: deletedList.id}, {listId: '', listName: ''}).exec();

            const deletedListAndTaskUpdates = {
                deletedList: deletedList,
                taskUpdates: taskUpdates
            }

            return res.status(204).json(deletedListAndTaskUpdates);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to delete list' })
            
        }

    }

}

module.exports = ListsController;