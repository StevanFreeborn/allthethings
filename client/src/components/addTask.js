import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import ListDropdown from './listsDropdown';

import ListService from '../services/listsService';
import TaskService from '../services/tasksService';
const listService = new ListService();
const taskService =  new TaskService();

export default function AddTask() {

    const navigate = useNavigate();
    const location = useLocation();

    const listId = location.state?.listId ? location.state.listId : '';
    const listName = location.state?.listName ? location.state.listName : '';
    
    const listAutoFocus = !listId ? true : false;
    const nameAutoFocus = listId ? true : false;

    console.log(listAutoFocus);

    const [options, setOptions] = useState([]);

    const [form, setForm] = useState({

        listId: listId,
        listName: listName,
        name: '',
        description: '',
        dueDate: ''
        
    });

    const [error, setError] = useState('');

    useEffect(() => {

        const getAllLists = async () => {

            const res = await listService.getAllLists();
    
            if (!res.ok) {
                const message = `An error occured: ${res.statusText}`;
                return window.alert(message);
            }
    
            const lists = await res.json();
    
            setOptions(lists);
    
        }

        getAllLists();

    }, [options.length]);

    const updateForm = (value) => {

        setForm(prev => {

            return {...prev, ...value };

        });

        return setError('');

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        const newTask = { ...form };

        const newTaskJson = JSON.stringify(newTask);

        const res = await taskService.addTask(newTaskJson);

        const data = await res.json();

        if (!res.ok) {

            return setError(data.error);

        }

        setForm({

            lisdId: '',
            listName: '',
            name: '',
            position: '',
            dueDate: ''

        });

        navigate(-1);

    }

    return (

        <div className='container-sm'>

            <div className='row'>

                <div className='col-12'>

                    <h3>Add Task</h3>

                </div>

            </div>

            <div className='row'>

                <div className='col-12'>

                    <form onSubmit={onSubmit}>

                        <ListDropdown
                            updateForm={updateForm}
                            existingList={form.listId}
                            options={options}
                            autoFocus={listAutoFocus}
                        />

                        <div className='form-group my-2'>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                className='form-control required'
                                id='name'
                                value={form.name}
                                onChange={(e) => updateForm({ name: e.target.value })}
                                autoFocus={nameAutoFocus}
                            />
                        </div>

                        <div className='form-group my-2'>
                            <label htmlFor='description'>Description</label>
                            <textarea
                                className='form-control required'
                                id='description'
                                value={form.description}
                                onChange={(e) => updateForm({ description: e.target.value })}
                            />
                        </div>

                        <div className='form-group my-2'>
                            <label htmlFor='dueDate'>Due Date</label>
                            <input
                                type='date'
                                className='form-control required'
                                id='dueDate'
                                value={form.dueDate}
                                onChange={(e) => updateForm({ dueDate: e.target.value })}
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

    );

}