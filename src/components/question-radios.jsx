import React from 'react';

export default class extends React.Component {
  static propTypes = {
    question: React.PropTypes.object.isRequired,
    answers: React.PropTypes.array,
    onAnswersUpdate: React.PropTypes.func
  }

  handleOptionChange(value) {
    this.props.onAnswersUpdate([value]);
  }

  render() {
    const question = this.props.question;
    const inputItems = this.props.question.answerOptions.map((option, index) => {
      const checked = this.props.answers[0] == option.value;
      const optionId = question._id + index;
      return (
        <div className="input-group">
          <input
            type="radio"
            name={ question._id }
            id={ optionId }
            key={ index }
            value={ option.value }
            checked={ checked }
            onChange={ this.handleOptionChange.bind(this, option.value) } />
          <label
            key={ index + 1 }
            htmlFor={ optionId }>
            { option.body }
          </label>
        </div>
      );
    });

    return (
      <div>
        <p>
          { question.body }
        </p>
        <form className="question-form">
         { inputItems }
        </form>
      </div>
    );
  }
}
