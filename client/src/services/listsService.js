class ListService {

    getAllLists = async () => {

        const res = await fetch(`/api/lists`, {
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
            }
        })

        return res;

    };

    getListTasks = async (id) => {

        const res = await fetch(`/api/lists/${id}/tasks`, {
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
            }
        });

        return res; 

    }

    getListById = async (id) => {

        const res = await fetch(`/api/lists/${id}`, {
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
            }
        });

        return res;

    }

    updateListById = async (id, updatedList) => {

        const res = await fetch(`/api/lists/update/${id}`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
            },
            body: updatedList

        });

        return res;

    }

    addList = async (newList) => {

        const res = await fetch('/api/lists/add', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
            },
            body: newList

        })

        return res;

    }

    deleteListById = async (id) => {

        const res = await fetch(`/api/lists/delete/${id}`, {

            method: 'DELETE',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
            }
    
        });

        return res;

    }

}

export default ListService;