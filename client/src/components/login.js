import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import UserService from '../services/usersService';
const userService = new UserService();

export default function Login(props) {

    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const updateForm = (value) => {

        return setForm(prev => {

            return {...prev, ...value };

        });

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        const user = { ...form }

        const userJson = JSON.stringify(user);

        const res = await userService.login(userJson);

        const data = await res.json();

        if (!res.ok) {
            const message = data.error;
            return window.alert(message);
        }

        localStorage.setItem('jwtToken', data.token);

        setForm({

            username: '',
            password: ''

        });

        props.setIsLoggedIn({ isLoggedIn: true });

        return navigate('/lists');

    }

    return (

        <div className='container-sm'>

            <div className='row'>

                <div className='col-12'>

                    <h3>Login</h3>

                </div>

            </div>

            <div className='row'>

                <div className='col-12'>

                    <form onSubmit={onSubmit}>

                        <div className='form-group my-2'>
                            <label htmlFor='username'>Username</label>
                            <input
                                type='text'
                                className='form-control'
                                id='username'
                                value={form.username}
                                onChange={(e) => updateForm({ username: e.target.value })}
                                required
                            />
                        </div>

                        <div className='form-group my-2'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                className='form-control'
                                id='password'
                                value={form.password}
                                onChange={(e) => updateForm({ password: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group my-4">
                            <input
                                type="submit"
                                value="Login"
                                className="btn btn-outline-success"
                            />
                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}