import React from 'react';
import Route from 'react-router-dom';
import Routes from 'react-router-dom';

import NavBar from './components/navbar';
import AddTask from './components/addTask';

const App = () => {

  return (

    <div>

      <NavBar />
      <Routes>
        <Route path='/tasks/add' element={<AddTask/>}/>
      </Routes>

    </div>

  );

}

export default App;
