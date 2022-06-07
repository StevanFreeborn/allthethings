const List = require('../models/list');

class ListsController {

    getAllLists = async (req, res) => {

        const userId = req.user.id;

        const lists = await List.find({userId: userId}).exec().catch(err => console.log(err));
    
        return res.status(200).json(lists);
    
    }

    getListById = async (req, res) => {

        const listId = req.params.id;
    
        const list = await List.findById(listId).exec().catch(err => console.log(err));
    
        return res.status(200).json(list);
    
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
        .catch(err => console.log(err));
    
    }

    updateListById = async (req, res) => {

        const listId = req.params.id;
    
        const updates = {
            name: req.body.name,
            description: req.body.description,
        }
    
        const updateOptions = {new: true};
    
        const updatedList = await List.findByIdAndUpdate(listId, updates, updateOptions).exec().catch(err => console.log(err));
    
        return res.status(200).json(updatedList);
    
    }

    // TODO: How to handle the tasks that reference the deleted list?
    deleteListById = async (req, res) => {

        const listId = req.params.id;

        const deletedList = await List.findByIdAndDelete(listId).exec().catch(err => console.log(err));

        return res.status(204).json(deletedList);

    }

}

module.exports = ListsController;