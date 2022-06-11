import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ListService from '../services/listsService';
const listService = new ListService();

export default function AddList() {

    const [form, setForm] = useState({

        name: '',
        description: ''

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

        const newList = { ...form };

        const newListJson = JSON.stringify(newList);

        const res = await listService.addList(newListJson);

        const data = await res.json();

        if (!res.ok) {

            return setError(data.error);

        }

        setForm({

            name: '',
            description: ''

        })

        navigate('/lists');

    }

    return (
        
        <div className='container-sm'>

            <div className='card p-5'>

                <div className='row'>

                    <div className='col-12'>

                        <h3>Add List</h3>

                    </div>

                </div>

                <div className='row'>

                    <div className='col-12'>

                        <form onSubmit={onSubmit}>

                            <div className='form-group my-2'>
                                <label htmlFor='name'>Name</label>
                                <input
                                    type='text'
                                    className='form-control required'
                                    id='name'
                                    value={form.name}
                                    onChange={(e) => updateForm({ name: e.target.value })}
                                    autoFocus
                                />
                            </div>

                            <div className='form-group my-2'>
                                <label htmlFor='description'>Description</label>
                                <textarea
                                    className='form-control'
                                    id='description'
                                    value={form.description}
                                    onChange={(e) => updateForm({ description: e.target.value })}
                                />
                            </div>

                            <div className="form-group my-4">

                                <input
                                    type="submit"
                                    value="Save"
                                    className="btn btn-outline-success"
                                />

                                <span
                                    className='text-danger m-3'
                                >
                                    {error}
                                </span>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}