import React from "react";

import ListDropdown from "./listsDropdown";

export default function TaskForm(props) {

    return (

        <form onSubmit={props.onSubmit}>

            <ListDropdown
                updateForm={props.updateForm}
                existingList={props.form.listId}
                options={props.options}
                autoFocus={props.listAutoFocus}
            />

            <div className='form-group my-2'>
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    className='form-control required'
                    id='name'
                    value={props.form.name}
                    onChange={(e) => props.updateForm({ name: e.target.value })}
                    autoFocus={props.nameAutoFocus}
                />
            </div>

            <div className='form-group my-2'>
                <label htmlFor='description'>Description</label>
                <textarea
                    className='form-control required'
                    id='description'
                    value={props.form.description}
                    onChange={(e) => props.updateForm({ description: e.target.value })}
                />
            </div>

            <div className='form-group my-2'>
                <label htmlFor='dueDate'>Due Date</label>
                <input
                    type='date'
                    className='form-control required'
                    id='dueDate'
                    value={props.form.dueDate}
                    onChange={(e) => props.updateForm({ dueDate: e.target.value })}
                />
            </div>

            <div className="form-group my-4">

                <input
                    type="submit"
                    value="Save"
                    className="btn btn-outline-success"
                />

                <span
                    className='text-danger m-3'
                >
                    {props.error}
                </span>

            </div>

        </form>

    );

}