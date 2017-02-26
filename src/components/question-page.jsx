import React from 'react';
import { Link, browserHistory } from 'react-router';
import Header from './header.jsx';
import ErrorPage from './error-page.jsx';
import QuestionRadios from './question-radios.jsx';
import QuestionCheckboxes from './question-checkboxes.jsx';
import QuestionText from './question-text.jsx';
import QuestionsNav from './questions-nav.jsx';
import '../styles/question.scss';

export default class extends React.Component {
  static propTypes = {
    account: React.PropTypes.object,
    onLogOut: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    document.title = "Question " + this.props.routeParams.questionNum;

    if (!props.account) {
      browserHistory.push({
        pathname: "/login",
        state: { nextPath: this.props.location.pathname }
      });
      return;
    }

    const testId = this.props.routeParams.testId;
    const testRoute = '/test/' + testId;
    this.state = localStorage[testId] ? JSON.parse(localStorage[testId]) : { };

    if (!this.state || !this.state.startDate) {
      return browserHistory.push(testRoute);
    } else if (this.state.endDate) {
      return browserHistory.push(testRoute + '/submit');
    } else {
      const length = this.state.questions.length;
      const questionNum = this.props.routeParams.questionNum;
      if (questionNum > length) {
        this.state.currentQuestion = length;
        return browserHistory.push(testRoute + '/' + length);
      } else if (questionNum < 1) {
        this.state.currentQuestion = 1;
        return browserHistory.push(testRoute + '/' + 1);
      }
    }

    if (!this.state.answers) {
      this.state.answers = [];
    }

    this.onAnswersUpdate = this.onAnswersUpdate.bind(this);
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

  /**
   * @return array
   */
  getAnswersValues() {
    const questionIndex = this.props.routeParams.questionNum - 1;
    const answers = this.state.answers;
    return answers[questionIndex] ? answers[questionIndex].values : [];
  }

  /**
   * @param values array Array of values
   * @return void
   */
  onAnswersUpdate(values) {
    const questionIndex = this.props.routeParams.questionNum - 1;
    const questionId = this.state.questions[questionIndex]._id;
    const newState = this.state;
    newState.answers[questionIndex] = { questionId, values };
    this.setState(newState);
  }

  render() {
    if (this.state.errorMsg) {
      return <ErrorPage errorMsg={ this.state.errorMsg } />;
    }

    const questionIndex = this.props.routeParams.questionNum - 1;
    const questionProps = {
      question: this.state.questions[questionIndex],
      answers: this.getAnswersValues(),
      onAnswersUpdate: this.onAnswersUpdate
    }

    let question = null;
    if ('radios' == this.state.questions[questionIndex].type) {
      question = <QuestionRadios { ...questionProps } />;
    } else if ('checkboxes' == this.state.questions[questionIndex].type) {
      question = <QuestionCheckboxes { ...questionProps } />;
    } else if ('text' == this.state.questions[questionIndex].type) {
      question = <QuestionText { ...questionProps } />;
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
            <h1>Question { this.props.routeParams.questionNum }</h1>
            <hr />
            { question }
            <QuestionsNav
              questions={ this.state.questions }
              routeParams={ this.props.routeParams } />
          </div>
        </div>
      </div>
    );
  }
}
