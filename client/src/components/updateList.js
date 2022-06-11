import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

import ListService from '../services/listsService';
const listService = new ListService();

export default function UpdateList() {

    const params = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState(null);

    const [error, setError] = useState('');

    useEffect(() => {

        const getListById = async () => {

            const id = params.id;
    
            const res = await listService.getListById(id);
    
            if (!res.ok) {
                const message = `An error has occurred: ${res.statusText}`;
                return window.alert(message);
            }
    
            const list = await res.json();
    
            if (!list) {
                window.alert(`list with id ${id} not found`);
                return navigate('/lists');
            }
    
            setForm(list);
    
        }

        getListById();

    }, [params.id, navigate]);

    const updateForm = (value) => {

        setForm(prev => {

            return { ...prev, ...value };

        });

        return setError('');

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        const updatedList = {

            name: form.name,
            description: form.description

        }

        const updatedListJson = JSON.stringify(updatedList);

        const listId = params.id;

        const res = await listService.updateListById(listId ,updatedListJson);

        const data = await res.json();

        if (!res.ok) {

            return setError(data.error);

        }

        navigate('/lists');

    }

    return (

        <>
            {form != null ?
                <div className='container-sm'>

                    <div className='row'>

                        <div className='col-12'>

                            <h3>
                                Update List
                            </h3>

                        </div>

                    </div>

                    <div className='row'>

                        <div className='col-12'>

                            <form
                                onSubmit={onSubmit}
                            >

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
            : null}
        </>

    );

}