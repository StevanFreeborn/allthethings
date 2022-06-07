import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import NavBar from './components/navbar';

import TaskTable from './components/taskTable';
import AddTask from './components/addTask';
import UpdateTask from './components/updateTask';

import ListTable from './components/listTable';
import AddList from './components/addList';

import Register from './components/register';
import Login from './components/login';

import UserService from './services/usersService';
const userService = new UserService();

const App = () => {

  const navigate = useNavigate();

  const [state, setState] = useState({
    isLoggedIn: false
  });

  useEffect(() => {

    const checkAuth = async () => {

      const res = await userService.checkAuth();

      if (!res.ok) {
        
        const path = window.location.pathname == '/users/register' ? '/users/register' : '/users/login';

        return navigate(path);

      }

      const state = await res.json();

      setState(state);

      const path = window.location.pathname == '/' ? '/tasks' : window.location.pathname;

      return navigate(path);

    }

    checkAuth();

}, [state.isLoggedIn]);

console.log(state);

  return (

    <div>

      <NavBar isLoggedIn={state.isLoggedIn} setIsLoggedIn={setState} />
      <Routes>

        { !state.isLoggedIn && <Route path='/users/login' element={ <Login setIsLoggedIn={setState}/> }/> }
        { !state.isLoggedIn && <Route path='/users/register' element={<Register />} /> }
      
        { state.isLoggedIn && <Route path='/tasks' element={<TaskTable />} /> }
        { state.isLoggedIn && <Route path='/tasks/add' element={<AddTask />} /> }
        { state.isLoggedIn && <Route path='/tasks/update/:id' element={<UpdateTask />} /> }

        { state.isLoggedIn && <Route path='/lists' element={<ListTable />} /> }
        { state.isLoggedIn && <Route path='/lists/add' element={<AddList />} /> }

      </Routes>

    </div>

  );

}

export default App;
