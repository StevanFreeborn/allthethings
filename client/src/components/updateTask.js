import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

import Card from './card';
import TaskForm from './taskForm';

import ListService from '../services/listsService';
import TaskService from '../services/tasksService';
const listService = new ListService();
const taskService = new TaskService();

export default function UpdateTask() {

    const params = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState(null);

    const [options, setOptions] = useState([]);

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

        setForm(prev => {

            return { ...prev, ...value };

        });

        return setError('');

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        const updatedTask = {
            listId: form.listId,
            listName: form.listName,
            name: form.name,
            description: form.description,
            dueDate: form.dueDate
        };

        const updatedTaskJson = JSON.stringify(updatedTask);

        const taskId = params.id;
        
        const res = await taskService.updateTaskById(taskId, updatedTaskJson);

        const data = await res.json();

        if (!res.ok) {

            return setError(data.error);

        }

        navigate(-1);

    }

    return (
        <>
            {form != null && options.length > 0 ?
                <div className='container-sm m-auto py-3'>

                    <Card>

                        <div className='row'>

                            <div className='col-12'>

                                <h3>
                                    Update Task
                                </h3>

                            </div>

                        </div>

                        <div className='row'>

                            <div className='col-12'>

                                <TaskForm
                                    onSubmit={onSubmit}
                                    form={form}
                                    updateForm={updateForm}
                                    error={error}
                                    options={options}
                                />

                            </div>

                        </div>

                    </Card>

                </div>
            : null}
        </>
    );

}