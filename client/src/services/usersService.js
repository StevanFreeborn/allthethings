class UserService {

    jwtToken = localStorage.getItem('jwtToken');

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
                'x-access-token': this.jwtToken
            }
        });

        return res;

    }

    logout = () => {

        return localStorage.removeItem('jwtToken');

    }

}

export default UserService;