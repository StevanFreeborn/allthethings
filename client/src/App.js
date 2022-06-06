import React, { useEffect, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import NavBar from './components/navbar';
import AddTask from './components/addTask';
import UpdateTask from './components/updateTask';
import TaskList from './components/taskList';
import Register from './components/register';
import Login from './components/login';

const App = () => {

  const navigate = useNavigate();

  const [state, setState] = useState({
    isLoggedIn: false
  });

  useEffect(() => {

    const checkAuth = async () => {

      const res = await fetch(`/users/auth`, {
        headers: {
          'x-access-token': localStorage.getItem('jwtToken')
        }
      })

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

          {state.isLoggedIn && <Route path='/tasks' element={ <TaskList/> }/> }
          {state.isLoggedIn && <Route path='/tasks/add' element={ <AddTask/> }/> }
          {state.isLoggedIn && <Route path='/tasks/update/:id' element={ <UpdateTask/> }/> }
  
      </Routes>

    </div>

  );

}

export default App;
