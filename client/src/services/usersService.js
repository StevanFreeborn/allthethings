class UserService {

    register = async (user) => {

        const res = await fetch('/api/users/register', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: user

        });

        return res;

    }

    login = async (user) => {

        const res = await fetch('/api/users/login', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: user

        });

        return res;

    }

    checkAuth = async () => {

        const res = await fetch(`/api/users/auth`, {
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
            }
        });

        return res;

    }

    logout = () => {

        return localStorage.removeItem('jwtToken');

    }

    getUserById = async () => {

        const res = await fetch(`/api/users/user`, {
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
            }
        });

        return res;

    }

    updateUserById = async (updatedUser) => {

        const res = await fetch('/api/users/update', {
            method: 'POST',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken'),
                'Content-Type': 'application/json'
            },
            body: updatedUser
        });

        return res;

    }

}

export default UserService;