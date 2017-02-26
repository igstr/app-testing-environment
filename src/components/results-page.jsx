import React from 'react';
import { Link } from 'react-router';
import Header from './header.jsx';

export default class extends React.Component {
  static propTypes = {
    account: React.PropTypes.object,
    onLogOut: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    const testId = this.props.routeParams.testId;
    this.state = localStorage[testId] ? JSON.parse(localStorage[testId]) : { };
  }

  render() {
    return (
      <div>
        <Header
          account={ this.props.account }
          onLogOut={ this.props.onLogOut }
          navLinks={[]}
          />
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            <h1 style={{ fontSize: "28px" }}>Congratulations!</h1>
            <h2 style={{ fontSize: "18px" }}>You have successfully completed &quot;{ this.state.test.title }&quot;.</h2>
            <div className="text-center" style={{ marginTop: "35px" }}>
              <Link to="/" className="btn btn-success">Return</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
