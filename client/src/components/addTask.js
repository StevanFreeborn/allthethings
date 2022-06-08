import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ListDropdown from './listsDropdown';

import ListService from '../services/listsService';
import TaskService from '../services/tasksService';
const listService = new ListService();
const taskService =  new TaskService();

export default function AddTask() {

    const navigate = useNavigate();

    const [options, setOptions] = useState([]);

    const [form, setForm] = useState({

        listId: '',
        listName: '',
        name: '',
        description: '',
        dueDate: ''
        
    });

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

        return setForm(prev => {

            return {...prev, ...value };

        });

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        const newTask = { ...form };

        const newTaskJson = JSON.stringify(newTask);

        const res = await taskService.addTask(newTaskJson);

        if (!res.ok) {
            const message = `An error has occurred: ${res.statusText}`;
            return window.alert(message);
        }

        setForm({

            lisdId: '',
            listName: '',
            name: '',
            position: '',
            dueDate: ''

        });

        navigate('/tasks');

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
                        />

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
                                required
                            />
                        </div>

                        <div className='form-group my-2'>
                            <label htmlFor='dueDate'>Due Date</label>
                            <input
                                type='date'
                                className='form-control'
                                id='dueDate'
                                value={form.dueDate}
                                onChange={(e) => updateForm({ dueDate: e.target.value })}
                                required
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