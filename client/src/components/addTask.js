import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import Card from './card';
import TaskForm from './taskForm';

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

        <div className='container-sm m-auto py-3'>

            <Card>

                <div className='row'>

                    <div className='col-12'>

                        <h3>Add Task</h3>

                    </div>

                </div>

                <div className='row'>

                    <div className='col-12'>

                        <TaskForm 
                            onSubmit={onSubmit}
                            form={form}
                            updateForm={updateForm}
                            listAutoFocus={listAutoFocus}
                            nameAutoFocus={nameAutoFocus}
                            error={error}
                            options={options}
                        />

                    </div>

                </div>

            </Card>

        </div>

    );

}