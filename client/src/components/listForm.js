import React from 'react';

export default function ListForm(props) {

    return (

        <form onSubmit={props.onSubmit}>

            <div className='form-group my-2'>
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    className='form-control required'
                    id='name'
                    value={props.form.name}
                    onChange={(e) => props.updateForm({ name: e.target.value })}
                    autoFocus
                />
            </div>

            <div className='form-group my-2'>
                <label htmlFor='description'>Description</label>
                <textarea
                    className='form-control'
                    id='description'
                    value={props.form.description}
                    onChange={(e) => props.updateForm({ description: e.target.value })}
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