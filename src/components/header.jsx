import React from 'react';
import { Link, browserHistory } from 'react-router';
import '../styles/header.scss';
import $ from 'jquery';

export default class extends React.Component {
  static propTypes = {
    account: React.PropTypes.object,
    onLogOut: React.PropTypes.func.isRequired,
    navLinks: React.PropTypes.arrayOf(React.PropTypes.object)
  }

  static defaultProps = {
    navLinks: [
      {
        text: "Link 1",
        uri: "/link1",
        active: true
      },
      {
        text: "Link 2",
        uri: "/link2",
        active: false
      }
    ]
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
    // Generate log in or log out button
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

    // Generate navigation links
    const navLinks = this.props.navLinks.map((link) => {
      const className = link.active ? "active" : "";
      return (
        <li className={ className } key={ this.props.navLinks.indexOf(link) }>
          <Link to={ link.uri }>{ link.text }</Link>
        </li>
      );
    });

    return(
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Testing environment</Link>
          </div>
          <ul className="nav navbar-nav">
            { navLinks }
          </ul>
          <ul className="nav navbar-nav navbar-right">
            { logInOutBtn }
          </ul>
        </div>
      </nav>
    );
  }
}
