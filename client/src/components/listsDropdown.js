import React from 'react';

const Option = (props) => {

    return (

        <option
            name={props.option.name}
            value={props.option._id}
        >
            {props.option.name}
        </option>

    )

}

export default function ListDropdown(props) {

    const getOptions = () => {

        return props.options.map(option => {

            return (

                <Option
                    option={option}
                    key={option._id}
                />

            );

        });

    }

    const defaultValue = props.existingList ? props.existingList : 'Inbox';
    
    return (

        <div className='form-group my-2'>
            <label htmlFor='list'>List</label>
            <select
                className='form-control'
                id='list'
                value={defaultValue}
                onChange={(e) => props.updateForm({ listId: e.target.value, listName: e.target.options[e.target.selectedIndex].text })}
            >
                <option value={'Inbox'}>- Select A List -</option>
                {getOptions()}
            </select>
        </div>

    );

}