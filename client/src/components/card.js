import React from 'react';

export default function Card(props) {

    return (
        <div className='card p-5'>
            {props.children}
        </div>
    );

}