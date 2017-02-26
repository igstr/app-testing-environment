import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';
import Header from './header.jsx';
import QuestionsNav from './questions-nav.jsx';

export default class extends React.Component {
  static propTypes = {
    account: React.PropTypes.object,
    onLogOut: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    document.title = "End of test";

    const testId = this.props.routeParams.testId;
    const testRoute = '/test/' + testId;
    this.state = localStorage[testId] ? JSON.parse(localStorage[testId]) : { };

    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  componentDidUpdate() {
    const testId = this.props.routeParams.testId;
    localStorage[testId] = JSON.stringify(this.state);

    if (!this.props.account) {
      browserHistory.push({
        pathname: "/login",
        state: { nextPath: this.props.location.pathname }
      });
    }
  }

  onSubmitClick() {
  }

  render() {
    const testRoute = '/test/' + this.props.routeParams.testId;
    const prevBtnLink = testRoute + '/' + this.state.questions.length;
    const prevBtnDisabled = this.state.endDate ? true : false;

    return (
      <div>
        <Header
          account={ this.props.account }
          onLogOut={ this.props.onLogOut }
          navLinks={[]}
          />
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            <h1>End of test</h1>
            <hr />
            <p>This is the end of the test. Before submitting your test answers, ensure that all questions are answered.</p>
            <QuestionsNav
              questions={ this.state.questions }
              routeParams={ this.props.routeParams }
              prevBtnText="Go back"
              prevBtnDisabled={ prevBtnDisabled }
              prevBtnLink={ prevBtnLink }
              nextBtnLink={ this.props.location.pathname }
              nextBtnOnClick={ this.onSubmitClick }
              nextBtnText="Submit"
              />
          </div>
        </div>
      </div>
    );
  }
}
