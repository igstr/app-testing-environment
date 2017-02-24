import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import '../styles/dashboard.scss';
import Header from './header.jsx';
import TestsList from './tests-list.jsx';

export default class extends React.Component {
  static propTypes = {
    account: React.PropTypes.object,
    onLogOut: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    document.title = "Tests List";

    this.state = {};

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
          account={ this.props.account }
          onLogOut={ this.props.onLogOut }
          navLinks={[]}
          />
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            { testList }
          </div>
        </div>
      </div>
    );
  }
}
