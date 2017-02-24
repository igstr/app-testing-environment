import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app.jsx';
import Login from './components/login.jsx';
import Dashboard from './components/dashboard.jsx';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="login" component={Login}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
