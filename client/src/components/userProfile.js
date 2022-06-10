import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import UserService from '../services/usersService';
const userService = new UserService();

export default function UserProfile() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({

        username: '',
        firstName: '',
        lastName: '',
        email: '',
        
    });

    useEffect(() => {

        const getUserProfile = async () => {

            const res = await userService.getUserById();
    
            if (!res.ok) {
                const message = `An error occured: ${res.statusText}`;
                return window.alert(message);
            }
    
            const profile = await res.json();
    
            setProfile(profile);
    
        }

        getUserProfile();

    }, []);

    const updateProfile = (value) => {

        return setProfile(prev => {

            return {...prev, ...value };

        });

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        const updatedProfile = { ...profile };

        const updatedProfileJson = JSON.stringify(updatedProfile);

        const res = await userService.updateUserById(updatedProfileJson);

        if (!res.ok) {
            const message = `An error has occurred: ${res.statusText}`;
            return window.alert(message);
        }

        navigate(0);

    }

    return (

        <div className='container-sm'>

            <div className='row'>

                <div className='col-12'>

                    <h3>Profile</h3>

                </div>

            </div>

            <div className='row'>

                <div className='col-12'>

                    <form onSubmit={onSubmit}>

                        <div className='form-group my-2'>
                            <label htmlFor='username'>Username</label>
                            <input
                                type='text'
                                className='form-control'
                                id='username'
                                value={profile.username}
                                onChange={(e) => updateProfile({ username: e.target.value })}
                                required
                            />
                        </div>

                        <div className='form-group my-2'>
                            <label htmlFor='firstName'>First Name</label>
                            <input
                                type='text'
                                className='form-control'
                                id='firstName'
                                value={profile.firstName}
                                onChange={(e) => updateProfile({ firstName: e.target.value })}
                                required
                            />
                        </div>

                        <div className='form-group my-2'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input
                                type='text'
                                className='form-control'
                                id='lastName'
                                value={profile.lastName}
                                onChange={(e) => updateProfile({ lastName: e.target.value })}
                                required
                            />
                        </div>

                        <div className='form-group my-2'>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                className='form-control'
                                id='email'
                                value={profile.email}
                                onChange={(e) => updateProfile({ email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group my-4">
                            <input
                                type="submit"
                                value="Save"
                                className="btn btn-outline-success"
                            />
                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}