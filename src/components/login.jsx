import React from 'react';
import { Link } from 'react-router'
import '../styles/login.scss';

export default class extends React.Component {
  handleLoginClick () {
    console.log('login');
  }

  render () {
    return (
      <div className="row">
        <div className="login-dialog well">
          <h2>Please login</h2>
          <hr/>
          <form id="login-form" noValidate="novalidate">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" className="form-control" id="email" name="email" value="" title="Please enter you email"/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" name="password" value="" title="Please enter your password"/>
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
