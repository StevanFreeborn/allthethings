import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import Card from './card';

import UserService from '../services/usersService';
const userService = new UserService();

export default function UserProfile() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [saveMessage, setSaveMessage] = useState({
        message: '',
        classNames: ''
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

        setProfile(prev => {

            return {...prev, ...value };

        });

        return setSaveMessage({
            message: '',
            classNames: ''
        });

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        const updatedProfile = { ...profile };

        const updatedProfileJson = JSON.stringify(updatedProfile);

        const res = await userService.updateUserById(updatedProfileJson);

        if (!res.ok) {

            const error = await res.json();

            if (error.error) return setSaveMessage({
                message: error.error,
                classNames: 'text-danger m-3'
            });

            const message = `An error has occurred: ${res.statusText}`;
            return window.alert(message);
        }

        setSaveMessage({
            message: 'Profile updated successfully',
            classNames: 'text-success m-3'
        });

        navigate(0);

    }

    return (

        <>
            {profile != null ?
                <div className='container-sm m-auto py-3'>

                    <Card>

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
                                            className='form-control required'
                                            id='username'
                                            value={profile.username}
                                            onChange={(e) => updateProfile({ username: e.target.value })}
                                            autoFocus
                                        />
                                    </div>

                                    <div className='form-group my-2'>
                                        <label htmlFor='firstName'>First Name</label>
                                        <input
                                            type='text'
                                            className='form-control required'
                                            id='firstName'
                                            value={profile.firstName}
                                            onChange={(e) => updateProfile({ firstName: e.target.value })}
                                        />
                                    </div>

                                    <div className='form-group my-2'>
                                        <label htmlFor='lastName'>Last Name</label>
                                        <input
                                            type='text'
                                            className='form-control required'
                                            id='lastName'
                                            value={profile.lastName}
                                            onChange={(e) => updateProfile({ lastName: e.target.value })}
                                        />
                                    </div>

                                    <div className='form-group my-2'>
                                        <label htmlFor='email'>Email</label>
                                        <input
                                            type='email'
                                            className='form-control required'
                                            id='email'
                                            value={profile.email}
                                            onChange={(e) => updateProfile({ email: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-group my-4">

                                        <input
                                            type="submit"
                                            value="Save"
                                            className="btn btn-outline-success"
                                        />

                                        <span
                                            className={saveMessage.classNames}
                                        >
                                            {saveMessage.message}
                                        </span>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </Card>

                </div>
            : null}
        </>
    );

}