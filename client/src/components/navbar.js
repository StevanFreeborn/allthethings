import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CheckSquare } from 'react-bootstrap-icons';

import UserService from '../services/usersService';
const userService = new UserService();

export default function NavBar(props) {

    const navigate = useNavigate();

    const handleLogOut = async () => {

        userService.logout();

        props.setIsLoggedIn({ isLoggedIn: false });

        return navigate('/users/login');

    }

    return (

        <div>
            <nav className='navbar navbar-dark bg-dark mb-auto'>

                <div className='navbar-brand mx-4'>

                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <CheckSquare /> <span className='ms-2'>All The Things</span>
                    </div>

                </div>

                <div className='nav mx-2'>
                    
                    { 
                        !props.isLoggedIn ?
                        <>
                            <NavLink 
                                className='nav-link link-light' 
                                to='/users/login'
                            >
                                Login
                            </NavLink>
                            
                            <NavLink 
                                className='nav-link link-light' 
                                to='/users/register'
                            >
                                Register
                            </NavLink>
                        </>
                        : '' 
                    }
                    
                    {/* Protected nav links */}
                    {
                        props.isLoggedIn && props.isLoggedIn !== 'authenticating' ?
                        <>

                        <NavLink 
                            className='nav-link link-light' 
                            to='/lists'
                        >
                            Lists
                        </NavLink>

                        <NavLink 
                            className='nav-link link-light' 
                            to='/tasks'
                        >
                            Tasks
                        </NavLink>

                        <NavLink 
                            className='nav-link link-light' 
                            to='/users/profile'
                        >
                            Profile
                        </NavLink>

                        <button 
                            className='btn btn-logout nav-link link-light border-0'
                            onClick={handleLogOut}
                        >
                            Logout
                        </button>

                        </>
                        : '' 
                    }

                </div>

            </nav>
            
        </div>

    );

}