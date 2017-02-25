import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app.jsx';
import Login from './components/login.jsx';
import Dashboard from './components/dashboard.jsx';
import NotFoundPage from './components/not-found-page.jsx';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="login" component={Login}/>
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Router>,
  document.getElementById('root')
);
