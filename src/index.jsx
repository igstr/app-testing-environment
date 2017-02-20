import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import App from './components/app.jsx';
import Login from './components/login.jsx';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="login" />
      <Route path="login" component={Login}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
