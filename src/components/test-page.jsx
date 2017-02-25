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

    $.get({
      url: globals.API_URI + "test/" + this.props.routeParams.testId
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

  onStartClick() {
    if (!this.props.account) {
      return browserHistory.push({
        pathname: "/login",
        state: { nextPath: this.props.location.pathname }
      });
    }
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
