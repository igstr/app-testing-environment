import React from 'react'
import '../styles/app.scss'
import $ from 'jquery';

// Setup jQuery for the app
$.ajaxSetup({
  method: "POST",
  contentType: 'application/json; charset=utf-8',
  dataType: 'json',
  processData: false,
  beforeSend: (xhr, settings) => {
    if (settings.data) {
      settings.data = JSON.stringify(settings.data);
    }
  }
});

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };
    if (localStorage.account) {
      this.state.account = JSON.parse(localStorage.account);
    }

    $.get({
      url: globals.API_URI + "account"
    })
    .then(data => {
      if ('success' == data.status) {
        this.setState({ account: data.data });
      }
    });

    this.onLogIn = this.onLogIn.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
  }

  componentDidUpdate() {
    localStorage.account = JSON.stringify(this.state.account);
  }

  onLogIn(account) {
    this.setState({ account: account });
  }

  onLogOut() {
    $.ajax({
      url: globals.API_URI + "logout"
    })
    .then(data => {
      if ('success' == data.status) {
        localStorage.removeItem('account');
        this.setState({ account: null });
      }
    });
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       account: this.state.account,
       onLogIn: this.onLogIn,
       onLogOut: this.onLogOut
     })
    );

    return childrenWithProps[0];
  }
}
