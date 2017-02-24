import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import '../styles/tests-list.scss';

export default class TestsList extends React.Component {
  static propTypes = {
    tests: React.PropTypes.arrayOf(React.PropTypes.object),
    onItemClick: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    tests: [
      {
        _id: 1,
        title: "x86 architecture test",
      },
      {
        _id: 2,
        title: "Web developer ninja skills test",
      },
      {
        _id: 3,
        title: "Overall knowledge test"
      },
      {
        _id: 4,
        title: "Object-oriented programming in Java test"
      }
    ]
  }

  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(id) {
    this.props.onItemClick(id);
  }

  render() {
    const listItems = this.props.tests.map((test) => {
      return(
        <li className="test-item" key={ test._id }>
          <a href="javascript:;" onClick={ this.onItemClick.bind(this, test._id) }>
            { test.title }
          </a>
        </li>
      );
    });

    return(
      <ul className="tests-list">
      { listItems }
      </ul>
    );
  }
}
