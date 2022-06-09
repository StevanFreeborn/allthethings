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

    const navigate = useNavigate();

    const updateForm = (value) => {

        return setForm(prev => {

            return {...prev, ...value };

        });

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        const newList = { ...form };

        const newListJson = JSON.stringify(newList);

        const res = await listService.addList(newListJson);

        if (!res.ok) {
            const message = `An error has occurred: ${res.statusText}`;
            return window.alert(message);
        }

        setForm({

            name: '',
            description: ''

        })

        navigate('/lists');

    }

    return (

        <div className='container-sm'>

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
                                className='form-control'
                                id='name'
                                value={form.name}
                                onChange={(e) => updateForm({ name: e.target.value })}
                                required
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
                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}