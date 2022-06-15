import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusLg } from 'react-bootstrap-icons';
import { ViewList } from 'react-bootstrap-icons';
import { Pencil } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';

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
                        to={`/tasks`}
                        state={{ listName: props.list.name, listId: props.list._id }}
                    >
                        <ViewList />
                    </Link>
                    
                    <Link
                        className='btn btn-outline-success m-1'
                        to={`/tasks/add`}
                        state={{ listId: props.list._id, listName: props.list.name }}
                    >
                        <PlusLg />
                    </Link>

                    <Link
                        className='btn btn-outline-dark m-1'
                        to={`/lists/update/${props.list._id}`}
                    >
                        <Pencil />
                    </Link>

                    <button
                        className='btn btn-outline-danger m-1'
                        onClick={() => props.deleteList(props.list.id)}
                    >
                        <Trash />
                    </button>

                </div>

            </td>
        </tr>

    );

}

export default function ListTable() {

    const [lists, setLists] = useState([]);
    const [textFilter, setTextFilter] = useState('.');

    useEffect(() => {

        const getAllLists = async () => {

            const res = await listService.getAllLists();
    
            if (!res.ok) {
                const message = `An error occured: ${res.statusText}`;
                return window.alert(message);
            }
    
            let lists = await res.json();

            lists = lists.filter(list => {
                
                const regex = new RegExp(textFilter, 'i');

                const hasNameFilter = regex.test(list.name);
                const hasDescriptionFilter = regex.test(list.description);
                
                return hasNameFilter || hasDescriptionFilter;
            });
    
            setLists(lists);
    
        }

        getAllLists();

    }, [lists.length, textFilter]);

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

        <div className='container-sm py-3'>

            <div className='row align-items-center'>

                <div className='col-10'>

                    <h3 className='m-0'>Lists</h3>

                </div>

                <div className='col-2'>

                    <div className='d-grid justify-content-end'>

                        <Link
                            className='btn btn-outline-success col-12'
                            to={`/lists/add`}
                        >
                            <PlusLg />
                        </Link>

                    </div>

                </div>

            </div>

            <div className='row align-items-center mt-2 gy-2'>

                <div className='col-sm-4 d-flex justify-content-start'>

                    <input
                        type='text'
                        className='form-control form-control-sm'
                        placeholder='Filter By Name/Description'
                        onChange={(e) => setTextFilter(e.target.value)}
                    />

                </div>

            </div>

            <div className='row align-items-center'>

                <div className='col-12'>

                    <div className='table-responsive'>

                        <table className='table'>

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

        </div>

    );

}