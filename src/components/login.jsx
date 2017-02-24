import React from 'react';
import { Router, Link, browserHistory } from 'react-router';
import $ from 'jquery';
import '../styles/login.scss';

export default class extends React.Component {
  static propTypes = {
    onLogIn: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleLoginClick () {
    $.ajax({
      url: globals.API_URI + "login",
      data: this.state,
    })
    .done(data => {
      if ('success' == data.status) {
        this.props.onLogIn(data.data);
        browserHistory.push('/');
      }
    });
  }

  render () {
    return (
      <div className="container">
        <div className="login-dialog well">
          <h2>Please login</h2>
          <hr/>
          <form className="login-form" noValidate="novalidate">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                title="Please enter you email"
                value={this.state.email}
                onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                title="Please enter your password"
                value={this.state.password}
                onChange={this.handleInputChange} />
            </div>
            <div id="login-error-msg" className="alert alert-danger hide">Wrong username or password</div>
            <div className="checkbox">
              <label>
                <input type="checkbox" name="remember" id="remember"/>Remember me
              </label>
            </div>
            <button type="button" onClick={this.handleLoginClick} className="btn btn-success btn-block">Login</button>
            <div className="text-center">
              <span style={{ display: "block", margin: "5px 0" }}>or</span>
              <Link to="/register" className="text-primary">Register</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
