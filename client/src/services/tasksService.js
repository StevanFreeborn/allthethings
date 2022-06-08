class TaskService {

    getAllTasks = async () => {

        const res = await fetch(`/api/tasks`, {
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
            }
        })

        return res;

    };

    getTaskById = async (id) => {

        const res = await fetch(`/api/tasks/${id}`, {
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
            }
        });

        return res;

    }

    updateTaskById = async (id, updatedTask) => {

        const res = await fetch(`/api/tasks/update/${id}`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
            },
            body: updatedTask

        });

        return res;

    }

    completeTask = async (id) => {

        const res = await fetch(`/api/tasks/complete/${id}`, {

            method: 'POST',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
            },

        });

        return res;

    }

    addTask = async (newTask) => {

        const res = await fetch('/api/tasks/add', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
            },
            body: newTask

        })

        return res;

    }

    deleteTaskById = async (id) => {

        const res = await fetch(`/api/tasks/delete/${id}`, {

            method: 'DELETE',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
            }
    
        });

        return res;

    }

}

export default TaskService;