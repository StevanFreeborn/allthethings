import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import Card from './card';

import UserService from '../services/usersService';
const userService = new UserService();

export default function Login(props) {

    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState(' ');

    const navigate = useNavigate();

    const updateForm = (value) => {

        setForm(prev => {

            return {...prev, ...value };

        });

        return setError('');

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        const user = { ...form }

        const userJson = JSON.stringify(user);

        const res = await userService.login(userJson);

        const data = await res.json();

        if (!res.ok) {

            return setError(data.error);

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

        <div className='container-sm m-auto py-3'>

            <Card>

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
                                    className='form-control required'
                                    id='username'
                                    value={form.username}
                                    onChange={(e) => updateForm({ username: e.target.value })}
                                    autoFocus
                                />
                            </div>

                            <div className='form-group my-2'>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type='password'
                                    className='form-control required'
                                    id='password'
                                    value={form.password}
                                    onChange={(e) => updateForm({ password: e.target.value })}
                                />
                            </div>

                            <div className="form-group mt-4 mb-2">

                                <div className='d-flex flex-row flex-wrap'>
                                    <input
                                        type="submit"
                                        value="Login"
                                        className="btn btn-outline-success me-3"
                                    />

                                    <Link
                                        className='link-dark mt-2'
                                        to={`/users/register`}
                                    >
                                        Don't have an account? Register here.
                                    </Link>
                                </div>

                            </div>

                            <div
                                className='text-danger my-2'
                            >
                                {error}
                            </div>

                        </form>

                    </div>

                </div>

            </Card>

        </div>

    );

}