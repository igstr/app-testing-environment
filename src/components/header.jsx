import React from 'react';
import { Link, browserHistory } from 'react-router';
import '../styles/header.scss';
import $ from 'jquery';

export default class extends React.Component {
  constructor(props) {
    super(props);


    if (!localStorage.account) {
      browserHistory.push('/login');
      return;
    }

    const accountData = JSON.parse(localStorage.account);
    if (!accountData.email || !accountData.fullname) {
      browserHistory.push('/login');
    }

    this.state = {
      account: accountData
    };
  }

  handleLogOutClick() {
    $.ajax({
      url: globals.API_URI + "logout"
    })
    .then(data => {
      localStorage.removeItem("account");
      browserHistory.push('/login');
    });
  }

  render() {
    return(
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Testing environment</Link>
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/dashboard">Dashboard</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="javascript:;" onClick={ this.handleLogOutClick }><span className="glyphicon glyphicon-log-out"></span> Log out</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}
