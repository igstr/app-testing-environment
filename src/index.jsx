import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app.jsx';
import Login from './components/login.jsx';
import Dashboard from './components/dashboard.jsx';
import TestPage from './components/test-page.jsx';
import QuestionPage from './components/question-page.jsx';
import SubmitPage from './components/submit-page.jsx';
import ErrorPage from './components/error-page.jsx';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="login" component={Login}/>
      <Route path="test/:testId" component={TestPage}/>
      <Route path="test/:testId/submit" component={SubmitPage}/>
      <Route path="test/:testId/:questionNum" component={QuestionPage}/>
    </Route>
    <Route path="*" component={ErrorPage} errorMsg="Page not found." />
  </Router>,
  document.getElementById('root')
);
