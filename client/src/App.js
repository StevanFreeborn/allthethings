import React from 'react';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import NavBar from './components/navbar';
import AddTask from './components/addTask';
import UpdateTask from './components/updateTask';
import TaskList from './components/taskList';

const App = () => {

  return (

    <div>

      <NavBar />
      <Routes>
        <Route exact path='/'/>
        <Route path='/tasks' element={ <TaskList/> }/>
        <Route path='/tasks/add' element={ <AddTask/> }/>
        <Route path='/tasks/update/:id' element={ <UpdateTask/> }/>
      </Routes>

    </div>

  );

}

export default App;
