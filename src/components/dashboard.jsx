import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import '../styles/dashboard.scss';
import Header from './header.jsx';
import TestsList from './tests-list.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);

    document.title = "Tests List";
  }

  render() {
    return(
      <div>
        <Header></Header>
        <div className="container">
          <h1>Tests List</h1>
          <hr />
          <TestsList></TestsList>
        </div>
      </div>
    );
  }
}
