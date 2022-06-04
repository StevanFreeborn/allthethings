import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';

export default function NavBar() {

    return (

        <div>
            <nav className='navbar navbar-dark bg-dark'>

                <NavLink className='navbar-brand' to='/'>
                    All The Things
                </NavLink>

                <NavLink className='nav-link' to='/'>
                    Tasks
                </NavLink>

                <NavLink className='nav-link' to='/tasks/add'>
                    Add Task
                </NavLink>

            </nav>
        </div>

    );

}