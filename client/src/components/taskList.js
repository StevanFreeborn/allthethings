import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Task = (props) => {

    const dueDate = new Date(props.task.dueDate).toLocaleDateString();

    return (

        <tr>
            <td>{props.task.name}</td>
            <td>{props.task.description}</td>
            <td>{dueDate}</td>
            <td>
                <Link className='btn btn-link' to={`/tasks/update/${props.task._id}`}>Update</Link>
                <button
                    className='btn btn-link'
                    onClick={() => props.deleteTask(props.task._id) }
                >
                    Delete
                </button>
            </td>
        </tr>
    
    );

}


export default function TaskList() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        const getTasks = async () => {

            const res = await fetch(`http://localhost:3000/tasks`)

            if (!res.ok) {
                const message = `An error occured: ${res.statusText}`;
                return window.alert(message);
            }

            const tasks = await res.json();

            setTasks(tasks);

        }

        getTasks();

    }, [tasks.length]);

    const deleteTask = async (id) => {

        await fetch(`http://localhost:3000/tasks/delete/${id}`, {

            method: 'DELETE'

        });

        const newTasks = tasks.filter(task => task._id !== id);

        setTasks(newTasks);

    }

    const taskList = () => {

        return tasks.map(task => {

            return (

                <Task
                    task={task}
                    deleteTask={ () => deleteTask(task._id) }
                    key={task._id}
                />

            );

        });

    }

    return (

        <div>

            <h3>Task List</h3>

            <table className='table table-striped'>

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Due Date</th>
                    </tr>
                </thead>

                <tbody>
                    {taskList()}
                </tbody>
                
            </table>

        </div>

    );

}