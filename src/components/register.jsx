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
      fullname: "",
      password: "",
      passwordConfirm: ""
    };

    this.handleRegisterClick = this.handleRegisterClick.bind(this);
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

  handleRegisterClick () {
    $.ajax({
      url: globals.API_URI + "register",
      data: this.state,
    })
    .done(data => {
      if ('success' == data.status) {
        this.props.onLogIn(data.data);
        const locState = this.props.location.state;
        const path = locState && locState.nextPath ? locState.nextPath : '/';
        browserHistory.push(path);
      }
    });
  }

  handleLoginClick () {
    const newLoc = {
      pathname: '/login',
      state: { }
    };
    const currentState = this.props.location.state;
    if (currentState && currentState.nextPath) {
      newLoc.state.nextPath = currentState.nextPath;
    }
    browserHistory.push(newLoc);
  }

  render () {
    return (
      <div className="container">
        <div className="login-dialog well">
          <h2>Registration form</h2>
          <hr/>
          <form className="login-form" noValidate="novalidate">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                title="Please enter your email"
                value={this.state.email}
                onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="fullname">Full name</label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                name="fullname"
                title="Please enter your full name"
                value={this.state.fullname}
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
            <div className="form-group">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordConfirm"
                name="passwordConfirm"
                title="Please re-enter your password"
                value={this.state.passwordConfirm}
                onChange={this.handleInputChange} />
            </div>
            <div id="login-error-msg" className="alert alert-danger hide">Wrong username or password</div>
            <button type="button" onClick={this.handleRegisterClick} className="btn btn-success btn-block">Register</button>
            <div className="text-center">
              <span style={{ display: "block", margin: "5px 0" }}>or</span>
              <Link
                onClick={ this.handleLoginClick }
                className="text-primary">
                  Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

