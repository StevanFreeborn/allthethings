import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

export default function UpdateTask() {

    const getDateLocal = (dateString) => {

        const date = new Date(dateString);

        const ten = (i) => {
            return (i < 10 ? '0' : '') + i;
        }

        const YYYY = date.getFullYear();
        const MM = ten(date.getMonth() + 1);
        const DD = ten(date.getDate());

        return `${YYYY}-${MM}-${DD}`

    }

    const [form, setForm] = useState({

        name: '',
        description: '',
        dueDate: ''

    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () =>  {

            const id = params.id;
            const res = await fetch(`http://localhost:3000/tasks/${id}`);

            if (!res.ok) {
                const message = `An error has occurred: ${res.statusText}`;
                window.alert(message);
                return;
            }

            const task = await res.json();

            if (!task) {
                window.alert(`Task with id ${id} not found`);
                navigate('/');
                return;
            }

            task.dueDate = getDateLocal(task.dueDate);

            setForm(task);

        }

        fetchData();

    }, [params.id, navigate]);

    const updateForm = (value) => {

        return setForm(prev => {

            return { ...prev, ...value };

        });

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        const updatedTask = {
            name: form.name,
            description: form.description,
            dueDate: form.dueDate
        }

        const updatedTaskJson = JSON.stringify(updatedTask);

        await fetch(`http://localhost:3000/tasks/update/${params.id}`, {

            method: 'POST',
            body: updatedTaskJson,
            headers: {
                'Content-Type': 'application/json'
            }

        });

        navigate('/');

    }

    return (

        <div className='m-5'>

            <h3>
                Update Task
            </h3>

            <form
                onSubmit={onSubmit}
            >

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

                <div className="form-group my-2">
                    <input
                        type="submit"
                        value="Save"
                        className="btn btn-outline-success"
                    />
                </div>

            </form>

        </div>

    );

}