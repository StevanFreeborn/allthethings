import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import TaskService from '../services/tasksService';
const taskService = new TaskService();

const TaskRow = (props) => {

    let dueDate = props.task.dueDate.split('T')[0];
    dueDate = dueDate.split('-');
    dueDate = `${dueDate[1]}/${dueDate[2]}/${dueDate[0]}`

    return (

        <tr className='align-middle'>
            <td>{props.task.listName}</td>
            <td>{props.task.name}</td>
            <td>{props.task.description}</td>
            <td>{dueDate}</td>
            <td>

                <div className='d-grid d-md-flex justify-content-md-center'>
                    
                    <Link
                        className='btn btn-outline-success m-1'
                        to={`/tasks/update/${props.task._id}`}
                    >
                        Update
                    </Link>

                    <button
                        className='btn btn-outline-danger m-1'
                        onClick={() => props.deleteTask(props.task.id)}
                    >
                        Delete
                    </button>

                </div>

            </td>
        </tr>
    
    );

}


export default function TaskTable() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        const getAllTasks = async () => {

            const res = await taskService.getAllTasks();
    
            if (!res.ok) {
                const message = `An error occured: ${res.statusText}`;
                return window.alert(message);
            }
    
            const tasks = await res.json();
    
            setTasks(tasks);
    
        }

        getAllTasks();

    }, [tasks.length]);

    const deleteTask = async (id) => {

        const res = await taskService.deleteTaskById(id);

        if (!res.ok) {
            const message = `An error occured: ${res.statusText}`;
            return window.alert(message);
        }

        const newTasks = tasks.filter(task => task._id !== id);

        setTasks(newTasks);

    }

    const taskList = () => {

        return tasks.map(task => {

            return (

                <TaskRow
                    task={task}
                    deleteTask={ () => deleteTask(task._id) }
                    key={task._id}
                />

            );

        });

    }

    return (

        <div className='container-sm'>

            <div className='row'>

                <div className='col-10'>

                    <h3>Tasks</h3>

                </div>

                <div className='col-2'>

                    <div className='d-grid d-md-flex justify-content-md-center'>

                        <Link
                            className='btn btn-outline-success col-12'
                            to={`/tasks/add`}
                        >
                            Add
                        </Link>

                    </div>

                </div>

            </div>

            <div className='row'>

                <div className='col-12'>

                    <table className='table table-striped'>

                        <thead>
                            <tr>
                                <th>List</th>
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

            </div>

        </div>

    );

}