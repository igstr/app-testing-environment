import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import Header from './header.jsx';

export default class extends React.Component {
  constructor(props) {
    super(props);

    document.title = "Error occurred";
  }

  render() {
    return (
      <div>
        <Header
          account={ this.props.account }
          onLogOut={ this.props.onLogOut }
          navLinks={[]}
          />
        <div className="container">
          <h1>Error occurred</h1>
          <p style={{ fontSize: "18px" }}>Page not found.</p>
        </div>
      </div>
    );
  }
}
