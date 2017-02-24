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

    // Retrieve tests data
    $.get({
      url: globals.API_URI + "test/"
    })
    .then((data) => {
      if ('success' == data.status) {
        this.setState({
          tests: data.data
        });
      }
    });

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

  onTestsListItemClick(id) {
  }

  render() {
    const testList = this.state.tests ?
      <div>
        <h1>Tests List</h1>
        <hr />
        <TestsList
          tests={ this.state.tests }
          onItemClick={ this.onTestsListItemClick } />
      </div>:"";

    return(
      <div>
        <Header
          account={ this.state.account }
          onLogOut={ this.onLogOut } />
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            { testList }
          </div>
        </div>
      </div>
    );
  }
}
