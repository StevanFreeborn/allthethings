import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';

export default NavBar = () => {

    return (

        <div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                
                <NavLink className='navbar-brand' to='/'>Home</NavLink>
                
                <buton
                    className='navbar-toggle'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </buton>

                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav ml-auto'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/tasks/add'>
                                Add Task
                            </NavLink>
                        </li>
                    </ul>
                </div>

            </nav>
        </div>

    );

}