import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

export default function UpdateTask() {

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
            const res = await fetch(`/tasks/${id}`);

            if (!res.ok) {
                const message = `An error has occurred: ${res.statusText}`;
                window.alert(message);
                return;
            }

            const task = await res.json();

            if (!task) {
                window.alert(`Task with id ${id} not found`);
                navigate('/tasks');
                return;
            }

            console.log(task.dueDate);

            task.dueDate = task.dueDate.split('T')[0];

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

        console.log(form.dueDate);

        const updatedTask = {
            name: form.name,
            description: form.description,
            dueDate: form.dueDate
        }

        const updatedTaskJson = JSON.stringify(updatedTask);
        console.log(updatedTaskJson);
        await fetch(`/tasks/update/${params.id}`, {

            method: 'POST',
            body: updatedTaskJson,
            headers: {
                'Content-Type': 'application/json'
            }

        });

        navigate('/tasks');

    }

    return (

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