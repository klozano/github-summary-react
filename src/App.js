import React from 'react';
import './App.css';
import Home from './home/Home.js';

import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';

const App = () => (
  <BrowserRouter>
    <div>
      {/* Defined routes */}
      <Route exact path="/" component={Home}/>
      <Route path="/home" component={Home}/>
    </div>
  </BrowserRouter>
)

export default App;
