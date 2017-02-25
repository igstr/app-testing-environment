import React from 'react';
import Header from './header.jsx';

export default class extends React.Component {
  static PropTypes = {
    errorMsg: React.PropTypes.string
  }

  static defaultProps = {
    errorMsg: 'Page not found.'
  }

  constructor(props) {
    super(props);
    document.title = "Error occurred";
  }

  render() {
    // Use either route props or component props
    const errorMsg = this.props.route && this.props.route.errorMsg ? this.props.route.errorMsg : this.props.errorMsg;

    return (
      <div>
        <Header
          account={ this.props.account }
          onLogOut={ this.props.onLogOut }
          navLinks={[]}
          />
        <div className="container">
          <h1>Error occurred</h1>
          <p style={{ fontSize: "18px" }}>{ errorMsg }</p>
        </div>
      </div>
    );
  }
}
