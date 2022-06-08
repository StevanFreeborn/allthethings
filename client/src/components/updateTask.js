import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

import ListDropdown from './listsDropdown';

import ListService from '../services/listsService';
import TaskService from '../services/tasksService';
const listService = new ListService();
const taskService = new TaskService();

export default function UpdateTask() {

    const params = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState(null);
    const [options, setOptions] = useState([]);

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
    
        const getTaskById = async () =>  {
    
            const id = params.id;
    
            const res = await taskService.getTaskById(id);
    
            if (!res.ok) {
                const message = `An error has occurred: ${res.statusText}`;
                return window.alert(message);
            }
    
            const task = await res.json();
    
            if (!task) {
                window.alert(`Task with id ${id} not found`);
                return navigate('/tasks');
            }
    
            task.dueDate = task.dueDate.split('T')[0];
    
            setForm(task);
    
        }

        getAllLists();
        getTaskById();

    }, [params.id, navigate, options.length]);

    const updateForm = (value) => {

        return setForm(prev => {

            return { ...prev, ...value };

        });

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        const updatedTask = {
            listId: form.listId,
            listName: form.listName,
            name: form.name,
            description: form.description,
            dueDate: form.dueDate
        }

        const updatedTaskJson = JSON.stringify(updatedTask);

        const taskId = params.id;
        
        const res = await taskService.updateTaskById(taskId, updatedTaskJson);

        if (!res.ok) {
            const message = `An error has occurred: ${res.statusText}`;
            window.alert(message);
            return;
        }

        navigate(-1);

    }

    return (
        <>
            {form != null && options.length > 0 ?
                <div className='container-sm'>

                    <div className='row'>

                        <div className='col-12'>

                            <h3>
                                Update Task
                            </h3>

                        </div>

                    </div>

                    <div className='row'>

                        <div className='col-12'>

                            <form
                                onSubmit={onSubmit}
                            >

                                <ListDropdown
                                    updateForm={updateForm}
                                    options={options}
                                    existingList={form.listId}
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
            : <div />}
        </>
    );

}