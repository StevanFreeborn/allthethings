import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import Card from './card';

import UserService from '../services/usersService';
const userService = new UserService();

export default function Register() {

    const [form, setForm] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const updateForm = (value) => {

        setForm(prev => {

            return {...prev, ...value };

        });

        return setError('');

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        const newUser = { ...form }

        const newUserJson = JSON.stringify(newUser);

        const res = await userService.register(newUserJson);

        const data = await res.json();

        if (!res.ok) {

            return setError(data.error);

        }

        setForm({

            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: ''

        });

        navigate('/users/login');

    }

    return (

        <div className='container-sm mt-auto py-3'>

            <Card>

                <div className='row'>

                    <div className='col-12'>

                        <h3>Register</h3>

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
                                <label htmlFor='firstName'>First Name</label>
                                <input
                                    type='text'
                                    className='form-control required'
                                    id='firstName'
                                    value={form.firstName}
                                    onChange={(e) => updateForm({ firstName: e.target.value })}
                                />
                            </div>

                            <div className='form-group my-2'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input
                                    type='text'
                                    className='form-control required'
                                    id='lastName'
                                    value={form.lastName}
                                    onChange={(e) => updateForm({ lastName: e.target.value })}
                                />
                            </div>

                            <div className='form-group my-2'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    className='form-control required'
                                    id='email'
                                    value={form.email}
                                    onChange={(e) => updateForm({ email: e.target.value })}
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

                            <div className="form-group my-4">

                            <div className='d-flex flex-row flex-wrap'>
                                <input
                                    type="submit"
                                    value="Register"
                                    className="btn btn-outline-success me-3"
                                />

                                <Link
                                    className='link-dark mt-2'
                                    to={`/users/login`}
                                >
                                    Already have an account? Login here.
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