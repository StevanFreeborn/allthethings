import React, { useEffect } from 'react';

import UserService from '../services/usersService';
const userService = new UserService();

export default function CheckAuth(props) {
    
    useEffect(() => {

        const checkAuth = async () => {
    
          const res = await userService.checkAuth();
    
          if (!res.ok) {
            
            const state = await res.json();
            props.setIsLoggedIn({isLoggedIn: state.isLoggedIn})
            return;
    
          }
    
          const state = await res.json();
    
          props.setIsLoggedIn(state);
    
        }
    
        checkAuth();
    
    });

    return (
        <></>
    );

}