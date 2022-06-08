import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { useNavigate } from "react-router";

import ListService from "../services/listsService";
const listService = new ListService();

export default function UpdateList() {

    const [form, setForm] = useState({

        name: '',
        description: ''

    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const getListById = async () => {

            const id = params.id;

            const res = await listService.getListById(id);

            if (!res.ok) {
                const message = `An error has occurred: ${res.statusText}`;
                return window.alert(message);
            }

            const list = await res.json();

            if (!list) {
                window.alert(`list with id ${id} not found`);
                return navigate('/lists');
            }

            setForm(list);

        }

        getListById();

    }, [params.id, navigate]);

    const updateForm = (value) => {

        return setForm(prev => {

            return { ...prev, ...value };

        });

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        const updatedList = {

            name: form.name,
            description: form.description

        }

        const updatedListJson = JSON.stringify(updatedList);

        const listId = params.id;

        const res = await listService.updateListById(listId ,updatedListJson);

        if (!res.ok) {
            const message = `An error has occurred: ${res.statusText}`;
            window.alert(message);
            return;
        }

        navigate('/lists');

    }

    return (

        <div className='container-sm'>

            <div className='row'>

                <div className='col-12'>

                    <h3>
                        Update List
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