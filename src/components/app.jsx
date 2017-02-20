import React from 'react'
import '../styles/app.scss'

export default class extends React.Component {
  render () {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}
