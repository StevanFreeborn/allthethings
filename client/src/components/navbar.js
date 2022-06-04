import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {

    return (

        <div>
            <nav className='navbar navbar-dark bg-dark mb-5'>

                <NavLink className='navbar-brand mx-5' to='/'>
                    All The Things
                </NavLink>

                <div className='nav mx-5'>

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