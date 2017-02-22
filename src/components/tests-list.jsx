import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import '../styles/tests-list.scss';

export default class TestsList extends React.Component {
  static propTypes = {
    testsTitles: React.PropTypes.arrayOf(React.PropTypes.string)
  }

  static defaultProps = {
    testsTitles: [
      'Ancient history test',
      'Web developer ninja skills test',
      'Overall knowledge test',
      'Philosophy of life in the galaxy test',
    ]
  }

  constructor(props) {
    super(props);
  }

  render() {
    const listItems = this.props.testsTitles.map((title, index) => {
      return <li className="test-item" key={ "test-item-" + index }><a href="javascript:;">{ title }</a></li>
    });

    return(
      <ul className="tests-list">
      { listItems }
      </ul>
    );
  }
}
