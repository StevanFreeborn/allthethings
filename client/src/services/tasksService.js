const { useCallback } = require("react");

class TaskService {

    getAllTasks = async () => {

        const res = await fetch(`/tasks`, {
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
            }
        })

        return res;

    };

    deleteTaskById = async (id) => {

        const res = await fetch(`/tasks/delete/${id}`, {

            method: 'DELETE',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
            }
    
        });

        return res;

    }

}

module.exports = TaskService;