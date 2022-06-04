import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';

export default function NavBar() {

    return (

        <div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>

                <NavLink className='navbar-brand' to='/'>Home</NavLink>

                <NavLink className='nav-link' to='/tasks/add'>
                    Add Task
                </NavLink>

            </nav>
        </div>

    );

}