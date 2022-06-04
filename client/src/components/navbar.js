import React from 'react';
import { NavLink } from 'react-router-dom';
import { CheckSquare } from 'react-bootstrap-icons';

export default function NavBar() {

    return (

        <div>
            <nav className='navbar navbar-dark bg-dark mb-5'>

                <NavLink className='navbar-brand mx-4' to='/'>
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <CheckSquare /> <span className='ms-2'>All The Things</span>
                    </div>
                </NavLink>

                <div className='nav mx-2'>

                    <NavLink className='nav-link link-light' to='/tasks'>
                        Tasks
                    </NavLink>

                    <NavLink className='nav-link link-light' to='/lists'>
                        Lists
                    </NavLink>

                </div>

            </nav>
        </div>

    );

}