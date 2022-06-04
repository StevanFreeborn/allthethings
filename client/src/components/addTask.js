import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function AddTask() {

    const [form, setForm] = useState({
        name: "",
        description: "",
        dueDate: ""
    });

    const navigate = useNavigate();

    const updateForm = (value) => {

        return setForm(prev => {

            return {...prev, ...value };

        });

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        const newTask = { ...form }

        const newTaskJson = JSON.stringify(newTask);

        console.log(newTaskJson);

        await fetch('http://localhost:3000/tasks/add', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: newTaskJson

        })
        .catch(err => window.alert(err));

        setForm({

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