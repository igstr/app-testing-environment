import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';
import Header from './header.jsx';
import ErrorPage from './error-page.jsx';

export default class extends React.Component {
  static propTypes = {
    account: React.PropTypes.object,
    onLogOut: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = { };
    const testId = this.props.routeParams.testId;
    const testState = localStorage[testId] ? JSON.parse(localStorage[testId]) : null;

    // Check if test have been started
    if (testState && testState.startDate) {
      let path = this.props.location.pathname;
      if (testState.endDate) {
        path += '/submit';
      } else if (testState.currentQuestion) {
        path += '/' + testState.currentQuestion;
      } else {
        path += '/1';
      }
      return browserHistory.push(path);
    }

    $.get({
      url: globals.API_URI + "test/" + testId
    })
    .then((data) => {
      if ('success' == data.status) {
        document.title = data.data.title;
        this.setState({
          test: data.data
        });
      } else if ('error' == data.status) {
        this.setState({
          errorMsg: data.message
        });
      }
    });

    this.onStartClick = this.onStartClick.bind(this);
  }

  componentDidUpdate() {
    const testId = this.props.routeParams.testId;
    localStorage[testId] = JSON.stringify(this.state);
  }

  onStartClick() {
    if (!this.props.account) {
      return browserHistory.push({
        pathname: "/login",
        state: { nextPath: this.props.location.pathname }
      });
    }

    $.get({
      url: globals.API_URI + "test/" + this.props.routeParams.testId + "/question"
    })
    .then(data => {
      if ('success' == data.status) {
        const newState = this.state;
        newState.questions = data.data;
        newState.startDate = Date.now();
        this.setState(newState);
        browserHistory.push(this.props.location.pathname + '/1');
      }
    });
  }

  render() {
    if (this.state.errorMsg) {
      return <ErrorPage errorMsg={ this.state.errorMsg } />;
    }

    let content;
    if (this.state.test) {
      const test = this.state.test;
      content =
        <div>
          <h1>{ test.title }</h1>
          <p>{ test.description }</p>
          <div className="text-right" style={{ marginTop: "20px" }}>
            <Link
              onClick={ this.onStartClick }
              className="btn btn-primary">
                Start test
            </Link>
          </div>
        </div>;
    }

    return (
      <div>
        <Header
          account={ this.props.account }
          onLogOut={ this.props.onLogOut }
          navLinks={[]}
          />
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            { content }
          </div>
        </div>
      </div>
    );
  }
}
