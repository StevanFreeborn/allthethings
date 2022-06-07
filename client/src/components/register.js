import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

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

    const navigate = useNavigate();

    const updateForm = (value) => {

        return setForm(prev => {

            return {...prev, ...value };

        });

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        const newUser = { ...form }

        const newUserJson = JSON.stringify(newUser);

        const res = await userService.register(newUserJson);

        const data = await res.json();

        if (!res.ok) {
            const message = data.error;
            return window.alert(message);
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

        <div className='container-sm'>

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
                                className='form-control'
                                id='username'
                                value={form.username}
                                onChange={(e) => updateForm({ username: e.target.value })}
                                required
                            />
                        </div>

                        <div className='form-group my-2'>
                            <label htmlFor='firstName'>First Name</label>
                            <input
                                type='text'
                                className='form-control'
                                id='firstName'
                                value={form.firstName}
                                onChange={(e) => updateForm({ firstName: e.target.value })}
                                required
                            />
                        </div>

                        <div className='form-group my-2'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input
                                type='text'
                                className='form-control'
                                id='lastName'
                                value={form.lastName}
                                onChange={(e) => updateForm({ lastName: e.target.value })}
                                required
                            />
                        </div>

                        <div className='form-group my-2'>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                className='form-control'
                                id='email'
                                value={form.email}
                                onChange={(e) => updateForm({ email: e.target.value })}
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
                                value="Register"
                                className="btn btn-outline-success"
                            />
                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}