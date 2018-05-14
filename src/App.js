import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import { Menu, Icon } from 'semantic-ui-react';

import './App.css';
import Users from './users/Users';
import Repositories from './repositories/Repositories';

const App = () => (
  <React.Fragment>
    <Menu stackable color='grey'>
      <Menu.Item>
        <a href='/'>
          <Icon name='github' />
          Github Summary
        </a>
      </Menu.Item>
    </Menu>
    <BrowserRouter>
      <div>
        {/* Defined routes */}
        <Route exact path="/" component={Users}/>
        <Route path="/users" component={Users}/>
        <Route path="/repositories/:username" component={Repositories}/>
      </div>
    </BrowserRouter>
  </React.Fragment>
)

export default App;
