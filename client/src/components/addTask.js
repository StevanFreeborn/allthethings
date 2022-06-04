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

        navigate('/');

    }

    return (

        <div>
            <h3>Create New Task</h3>

            <form onSubmit={onSubmit}>

                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        className='form-control'
                        id='name'
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        className='form-control'
                        id='description'
                        value={form.description}
                        onChange={(e) => updateForm({ description: e.target.value })}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='dueDate'>Due Date</label>
                    <input
                        type='date'
                        className='form-control'
                        id='dueDate'
                        value={form.dueDate}
                        onChange={(e) => updateForm({ dueDate: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="add task"
                        className="btn btn-primary"
                    />
                </div>

            </form>
        </div>

    );

}