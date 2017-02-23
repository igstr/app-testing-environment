import React from 'react';
import { Link, browserHistory } from 'react-router';
import '../styles/header.scss';
import $ from 'jquery';

export default class extends React.Component {
  static propTypes = {
    account: React.PropTypes.object,
    onLogOut: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.handleLogOutClick = this.handleLogOutClick.bind(this);
  }

  handleLogOutClick() {
    this.props.onLogOut();
  }

  handleLogInClick() {
    browserHistory.push('/login');
  }

  render() {
    const logInOutBtn = this.props.account ?
      <li>
        <a href="javascript:;" onClick={ this.handleLogOutClick }>
          <span className="glyphicon glyphicon-log-out"></span> Log out
        </a>
      </li>:
      <li>
        <a href="javascript:;" onClick={ this.handleLogInClick }>
          <span className="glyphicon glyphicon-log-in"></span> Log In
        </a>
      </li>;

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
            { logInOutBtn }
          </ul>
        </div>
      </nav>
    );
  }
}
