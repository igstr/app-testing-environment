import React from 'react';
import { Link, browserHistory } from 'react-router';

export default class extends React.Component {
  static propTypes = {
    questions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    routeParams: React.PropTypes.object.isRequired,
    nextBtnText: React.PropTypes.string,
    prevBtnText: React.PropTypes.string,
    nextBtnLink: React.PropTypes.string,
    prevBtnLink: React.PropTypes.string,
    prevBtnDisabled: React.PropTypes.bool,
    nextBtnOnClick: React.PropTypes.func
  }

  render() {
    const props = this.props;
    const questionIndex = props.routeParams.questionNum - 1;
    const testRoute = '/test/' + props.routeParams.testId;

    const prevBtnLink = props.prevBtnLink ? props.prevBtnLink : testRoute + '/' + questionIndex;
    const prevBtnDisabled = questionIndex == 0 || this.props.prevBtnDisabled ? ' disabled' : '';
    const prevBtnClass = "btn btn-default btn-sm" + prevBtnDisabled;
    const prevBtnText = props.prevBtnText ? props.prevBtnText : 'Previous';
    const previousBtn =
      <Link
        to={ prevBtnLink }
        className={ prevBtnClass }>
          { prevBtnText }
      </Link>;

    const nextBtnText = props.nextBtnText ? props.nextBtnText : 'Next';
    const nextBtnOnClick = props.nextBtnOnClick ? props.nextBtnOnClick : Function.prototype;
    let nextBtnLink;
    if (props.nextBtnLink) {
      nextBtnLink = props.nextBtnLink;
    } else if (questionIndex + 1 == this.props.questions.length) {
      nextBtnLink = testRoute + '/submit';
    } else {
      nextBtnLink = testRoute + '/' + (questionIndex + 2);
    }

    const nextBtn =
      <Link
        to={ nextBtnLink }
        className="btn btn-primary btn-sm"
        onClick={ nextBtnOnClick }>
        { nextBtnText }
      </Link>;

    const paginationItems = null;

    return (
      <div className="row question-nav">
        <div className="col-xs-2">
          { previousBtn }
        </div>
        <div className="col-xs-8 text-center">
          <nav aria-label="Questions navigation">
            <ul className="pagination pagination-sm">
              { paginationItems }
            </ul>
          </nav>
        </div>
        <div className="col-xs-2 text-right">
          { nextBtn }
        </div>
      </div>
    );
  }
}
