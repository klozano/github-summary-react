import React from 'react';
import './App.css';
import Users from './users/Users';

import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';

const App = () => (
  <BrowserRouter>
    <div>
      {/* Defined routes */}
      <Route exact path="/" component={Users}/>
      <Route path="/users" component={Users}/>
    </div>
  </BrowserRouter>
)

export default App;
