import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/app.css';

import NavBar from './components/navbar';
import Footer from './components/footer';

import TaskTable from './components/taskTable';
import AddTask from './components/addTask';
import UpdateTask from './components/updateTask';

import ListTable from './components/listTable';
import AddList from './components/addList';
import UpdateList from './components/updateList';

import Register from './components/register';
import Login from './components/login';
import CheckAuth from './components/checkAuth';
import UserProfile from './components/userProfile';

const App = () => {

  const [state, setState] = useState({
    isLoggedIn: 'authenticating'
  });

  return (

    <div className='d-flex flex-column min-vh-100'>

      {/* hide navbar until auth check is complete*/}
      {state.isLoggedIn !== 'authenticating' ?
        <NavBar isLoggedIn={state.isLoggedIn} setIsLoggedIn={setState} />
        : null
      }

      <Routes>

        {/* perform initial auth check in checkAuth component */}
        {state.isLoggedIn === 'authenticating' ?
          <Route path='*' element={<CheckAuth setIsLoggedIn={setState} />} />
          : null
        }

        {/* Unprotected routes */}
        {
          (!state.isLoggedIn) ?
            <>
              <Route path='/users/login' element={<Login setIsLoggedIn={setState} />} />
              <Route path='/users/register' element={<Register />} />

              {/* "Default" unprotected route */}
              <Route path='*' element={<Navigate replace to='/users/login' />} />
            </>
            : null
        }

        {/* Protected routes */}
        {
          state.isLoggedIn && state.isLoggedIn !== 'authenticating' ?
            <>
              <Route path='/tasks' element={<TaskTable />} />
              <Route path='/tasks/add' element={<AddTask />} />
              <Route path='/tasks/update/:id' element={<UpdateTask />} />

              <Route path='/lists' element={<ListTable />} />
              <Route path='/lists/add' element={<AddList />} />
              <Route path='/lists/update/:id' element={<UpdateList />} />

              <Route path='/users/profile' element={<UserProfile />} />

              {/* "Default" unprotected route */}
              <Route path='*' element={<Navigate replace to='/lists' />} />
            </>
            : null
        }

      </Routes>

      {/* hide navbar until auth check is complete*/}
      {state.isLoggedIn !== 'authenticating' ?
        <Footer />
        : null
      }

    </div>

  );

}

export default App;
