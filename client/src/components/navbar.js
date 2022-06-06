import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CheckSquare } from 'react-bootstrap-icons';

export default function NavBar({isLoggedIn, setIsLoggedIn}) {

    const navigate = useNavigate();

    const handleLogOut = async () => {

        await fetch('/users/logout', {method: 'POST'})
        .catch(err => window.alert(err));

        setIsLoggedIn({ isLoggedIn: false });

        return navigate('/users/login');

    }

    return (

        <div>
            <nav className='navbar navbar-dark bg-dark mb-5'>

                <div className='navbar-brand mx-4'>

                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <CheckSquare /> <span className='ms-2'>All The Things</span>
                    </div>

                </div>

                <div className='nav mx-2'>
                    
                    { !isLoggedIn ?
                    <>
                    <NavLink className='nav-link link-light' to='/users/login'>
                        Login
                    </NavLink>
                    
                    <NavLink className='nav-link link-light' to='/users/register'>
                        Register
                    </NavLink>
                    </>
                    : '' }
                    
                    { isLoggedIn ?
                    <>
                    <NavLink className='nav-link link-light' to='/tasks'>
                        Tasks
                    </NavLink>

                    <NavLink className='nav-link link-light' to='/lists'>
                        Lists
                    </NavLink>

                    <button 
                        className='btn btn-link nav-link link-light'
                        onClick={handleLogOut}
                    >
                        Logout
                    </button>
                    </>
                    : '' }

                </div>

            </nav>
            
        </div>

    );

}