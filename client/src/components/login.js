import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Login({setIsLoggedIn}) {

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

        const res = await fetch('/users/login', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: userJson

        })
        .catch(err => window.alert(err));

        console.log(res);

        if (!res.ok) return navigate('/users/login');

        setForm({

            username: '',
            password: ''

        });

        setIsLoggedIn({ isLoggedIn: true });

        return navigate('/tasks');

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