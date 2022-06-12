import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from './card';
import ListForm from './listForm';

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

            <Card>

                <div className='row'>

                    <div className='col-12'>

                        <h3>Add List</h3>

                    </div>

                </div>

                <div className='row'>

                    <div className='col-12'>

                        <ListForm
                            onSubmit={onSubmit}
                            form={form}
                            updateForm={updateForm}
                            error={error}
                        />

                    </div>

                </div>

            </Card>

        </div>

    );

}