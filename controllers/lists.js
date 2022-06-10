const List = require('../models/list');
const Task = require('../models/task');

class ListsController {

    getAllLists = async (req, res) => {

        const userId = req.user.id;

        if (!userId) return res.status(400).json({ error: 'Required field(s) missing' })

        try {

            const lists = await List.find({userId: userId}).exec();

            return res.status(200).json(lists);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to get lists' })
            
        }
    
    }

    getListTasks = async (req, res) => {

        const userId = req.user.id;
        const listId = req.params.id;

        if (!userId || !listId) return res.status(400).json({ error: 'Required field(s) missing' })

        try {

            const tasks = await Task.find({userId: userId, listId: listId}).exec();

            return res.status(200).json(tasks);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to get tasks for list' })
            
        }

    }

    getListById = async (req, res) => {

        const userId = req.user.id;
        const listId = req.params.id;
        console.log(userId);
        console.log(listId);

        if (!userId || !listId) return res.status(400).json({ error: 'Required field(s) missing' })

        try {

            const list = await List.findOne({userId: userId, _id: listId}).exec();

            return res.status(200).json(list);
            
        } catch (error) {

            console.log(error);

            return res.status(500).json({ error: 'Unable to get list' });
            
        }
    
    }

    addList = async (req, res) => {

        const userId = req.user.id;

        if (!userId) return res.status(400).json({ error: 'Required field(s) missing' })

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

        const userId = req.user.id;
        const listId = req.params.id;
        const name = req.body.name;

        if (!listId || !userId || !name) return res.status(400).json({ error: 'Required field(s) missing' });

        const listQuery = {
            userId: userId,
            _id: listId
        }
    
        const updates = {
            name: name,
            description: req.body.description,
        }
    
        const updateOptions = {new: true};

        try {

            const updatedList = await List.findOneAndUpdate(listQuery, updates, updateOptions).exec();

            const taskQuery = {
                userId: userId,
                listId: listId
            }

            const taskUpdates = await Task.updateMany(taskQuery, {listName: updatedList.name}).exec();

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

        const userId = req.user.id;
        const listId = req.params.id;

        if (!userId || !listId) return res.status(400).json({ error: 'Required field(s) missing' })

        const listQuery = {
            userId: userId,
            _id: listId
        }

        try {

            const deletedList = await List.findOneAndDelete(listQuery).exec();

            const taskQuery = {
                userId: userId,
                listId: listId
            }

            const taskUpdates = await Task.updateMany(taskQuery, {listId: '', listName: ''}).exec();

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