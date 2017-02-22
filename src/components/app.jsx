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
  render () {
    return this.props.children;
  }
}
