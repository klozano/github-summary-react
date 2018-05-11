import React from 'react';
import './App.css';
import Users from './users/Users';
import Repositories from './repositories/Repositories';

import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';

const App = () => (
  <BrowserRouter>
    <div>
      {/* Defined routes */}
      <Route exact path="/" component={Users}/>
      <Route path="/users" component={Users}/>
      <Route path="/repositories/:userId" component={Repositories}/>
    </div>
  </BrowserRouter>
)

export default App;
