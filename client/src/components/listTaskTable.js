import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router';
import { PlusLg } from 'react-bootstrap-icons';
import { Check } from 'react-bootstrap-icons';
import { Pencil } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';

import ListService from '../services/listsService';
import TaskService from '../services/tasksService';
const listService = new ListService();
const taskService = new TaskService();


const TaskRow = (props) => {

    let dueDate = props.task.dueDate.split('T')[0];
    dueDate = dueDate.split('-');
    dueDate = `${dueDate[1]}/${dueDate[2]}/${dueDate[0]}`

    return (

        <tr className='align-middle'>
            <td>{props.task.name}</td>
            <td>{props.task.description}</td>
            <td>{dueDate}</td>
            <td>

                <div className='d-grid d-md-flex justify-content-md-center'>

                    {!props.task.complete ?
                    <button
                        className='btn btn-outline-primary m-1'
                        onClick={() => props.completeTask(props.task.id)}
                    >
                        <Check />
                    </button>
                    : null } 

                    <Link
                        className='btn btn-outline-dark m-1'
                        to={`/tasks/update/${props.task._id}`}
                    >
                        <Pencil />
                    </Link>

                    <button
                        className='btn btn-outline-danger m-1'
                        onClick={() => props.deleteTask(props.task.id)}
                    >
                        <Trash />
                    </button>

                </div>

            </td>
        </tr>
    
    );

}

export default function TaskTable() {

    const params = useParams();
    const location = useLocation();

    const listId = params.id;
    const listName = location.state?.listName;

    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState(false);

    useEffect(() => {

        const getAllTasks = async () => {

            const res = await listService.getListTasks(listId);
    
            if (!res.ok) {
                const message = `An error occured: ${res.statusText}`;
                return window.alert(message);
            }
    
            let tasks = await res.json();

            tasks = tasks.filter(task => task.complete === statusFilter);
    
            setTasks(tasks);
    
        }

        getAllTasks();

    }, [tasks.length, listId, statusFilter]);

    const showCompleted = (status) => {

        return setStatusFilter(status);

    }

    const deleteTask = async (id) => {

        const res = await taskService.deleteTaskById(id);

        if (!res.ok) {
            const message = `An error occured: ${res.statusText}`;
            return window.alert(message);
        }

        const newTasks = tasks.filter(task => task._id !== id);

        setTasks(newTasks);

    }

    const completeTask = async (id) => {

        const res = await taskService.completeTask(id);

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
                    completeTask={ () => completeTask(task._id) }
                    key={task._id}
                />

            );

        });

    }

    return (

        <div className='container-sm m-auto py-3'>

            <div className='row'>

                <div className='col-10'>

                    <h3>{`${listName} Tasks`}</h3>

                </div>

                <div className='col-2'>

                    <div className='d-grid justify-content-end'>

                        <Link
                            className='btn btn-outline-success col-12'
                            to={`/tasks/add`}
                            state={{ listId: listId, listName: listName }}
                        >
                            <PlusLg />
                        </Link>

                    </div>

                </div>

            </div>

            <div className='row'>

                <div className='col-12'>

                    <div className="form-check form-switch">

                        <input
                            className="form-control form-check-input"
                            type="checkbox"
                            role="switch"
                            id="statusFilter"
                            onClick={(e) => showCompleted(e.target.checked)}
                        />

                        <label
                            className="form-check-label"
                            htmlFor="statusFilter"
                        >
                            Show Completed
                        </label>

                    </div>

                </div>

                <div className='row'>

                    <div className='col-12'>

                        <div className='table-responsive'>

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

                    </div>

                </div>

            </div>

        </div>

    );

}