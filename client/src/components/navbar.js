import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CheckSquare } from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

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

        <Navbar bg="dark" expand="sm" variant="dark">

            <Container fluid>

                <Navbar.Brand>

                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <CheckSquare /> <span className='ms-2'>All The Things</span>
                    </div>

                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="ms-auto">
                        
                        {
                            !props.isLoggedIn ? 
                            <>
                                <NavLink
                                    className='text-center nav-link link-light active'
                                    to='/users/login'
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    className='text-center nav-link link-light active'
                                    to='/users/register'
                                >
                                    Register
                                </NavLink>
                            </>
                            : ''
                        }
                        
                        {
                            props.isLoggedIn && props.isLoggedIn !== 'authenticating' ?
                            <>
                                <NavLink
                                    className='text-center nav-link link-light active'
                                    to='/lists'
                                >
                                    Lists
                                </NavLink>

                                <NavLink
                                    className='text-center nav-link link-light active'
                                    to='/tasks'
                                >
                                    Tasks
                                </NavLink>

                                <NavLink
                                    className='text-center nav-link link-light active'
                                    to='/users/profile'
                                >
                                    Profile
                                </NavLink>

                                <button
                                    className='text-center btn btn-logout nav-link link-light border-0 active'
                                    onClick={handleLogOut}
                                >
                                    Logout
                                </button>
                            </>
                            : ''
                        }

                    </Nav>

                </Navbar.Collapse>

            </Container>
            
        </Navbar>

    );

}