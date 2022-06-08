import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import ListService from '../services/listsService';
const listService = new ListService();

const ListRow = (props) => {

    return (

        <tr className='align-middle'>
            <td>{props.list.name}</td>
            <td>{props.list.description}</td>
            <td>

                <div className='d-grid d-md-flex justify-content-md-center'>

                    <Link
                        className='btn btn-outline-primary m-1'
                        to={`/lists/${props.list._id}/tasks`}
                        state={{ listName: props.list.name }}
                    >
                        Tasks
                    </Link>

                    <Link
                        className='btn btn-outline-success m-1'
                        to={`/lists/update/${props.list._id}`}
                    >
                        Update
                    </Link>

                    <button
                        className='btn btn-outline-danger m-1'
                        onClick={() => props.deleteList(props.list.id)}
                    >
                        Delete
                    </button>

                </div>

            </td>
        </tr>

    );

}

export default function ListTable() {

    const [lists, setLists] = useState([]);

    useEffect(() => {

        const getAllLists = async () => {

            const res = await listService.getAllLists();
    
            if (!res.ok) {
                const message = `An error occured: ${res.statusText}`;
                return window.alert(message);
            }
    
            const lists = await res.json();
    
            setLists(lists);
    
        }

        getAllLists();

    }, [lists.length]);

    const deleteList = async (id) => {

        const res = await listService.deleteListById(id);

        if (!res.ok) {
            const message = `An error occured: ${res.statusText}`;
            return window.alert(message);
        }

        const newLists = lists.filter(list => list._id !== id);

        setLists(newLists);

    }

    const listList = () => {

        return lists.map(list => {

            return (

                <ListRow
                    list={list}
                    deleteList={() => deleteList(list._id)}
                    key={list._id}
                />

            );

        });

    }

    return (

        <div className='container-sm'>

            <div className='row'>

                <div className='col-10'>

                    <h3>Lists</h3>

                </div>

                <div className='col-2'>

                    <div className='d-grid d-md-flex justify-content-md-center'>

                        <Link
                            className='btn btn-outline-success col-12'
                            to={`/lists/add`}
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
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>

                        <tbody>
                            {listList()}
                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}