import React from 'react';

export default class extends React.Component {
  static propTypes = {
    question: React.PropTypes.object.isRequired,
    answers: React.PropTypes.array,
    onAnswersUpdate: React.PropTypes.func
  }

  handleOptionChange(event) {
    this.props.onAnswersUpdate([event.target.value]);
  }

  render() {
    const question = this.props.question;
    return (
      <div>
        <p>
          { question.body }
        </p>
        <form className="question-form">
          <div className="input-group">
            <label
              forHtml={ question._id } >
              Answer
            </label>
            <input
              type="text"
              id={ question._id }
              name="answer"
              value={ this.props.answers[0] }
              onChange={ this.handleOptionChange.bind(this) }
              className="form-control" />
          </div>
        </form>
      </div>
    );
  }
}
