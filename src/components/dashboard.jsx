import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import '../styles/dashboard.scss';
import Header from './header.jsx';
import TestsList from './tests-list.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      account: null
    }

    if (localStorage.account) {
      const accountData = JSON.parse(localStorage.account);
      if (accountData.email && accountData.fullname) {
        this.state = {
          account: accountData
        }
      }
    }

    document.title = "Tests List";

    this.onLogOut = this.onLogOut.bind(this);
  }

  onLogOut() {
    $.ajax({
      url: globals.API_URI + "logout"
    })
    .then(data => {
      localStorage.removeItem("account");
      this.setState({
        account: null
      });
    });
  }

  render() {
    return(
      <div>
        <Header
          account={ this.state.account }
          onLogOut={ this.onLogOut } />
        <div className="container">
          <h1>Tests List</h1>
          <hr />
          <TestsList />
        </div>
      </div>
    );
  }
}
