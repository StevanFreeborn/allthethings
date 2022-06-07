import React, { useEffect, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { Routes } from 'react-router-dom';
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
        return navigate('/users/login');
      }

      const state = await res.json();

      setState(state);

      return navigate('/tasks');

    }

    checkAuth();

}, [state.isLoggedIn]);


  return (

    <div>

      <NavBar isLoggedIn={state.isLoggedIn} setIsLoggedIn={setState}/>
      <Routes>
        
          <Route path='/users/register' element={ <Register/> }/>
          <Route path='/users/login' element={ <Login setIsLoggedIn={setState}/> }/>

          {state.isLoggedIn && <Route path='/tasks' element={ <TaskTable/> }/> }
          {state.isLoggedIn && <Route path='/tasks/add' element={ <AddTask/> }/> }
          {state.isLoggedIn && <Route path='/tasks/update/:id' element={ <UpdateTask/> }/> }

          {state.isLoggedIn && <Route path='/lists' element={ <ListTable/> }/> }
          {state.isLoggedIn && <Route path='/lists/add' element={ <AddList/> }/> }
  
      </Routes>

    </div>

  );

}

export default App;
