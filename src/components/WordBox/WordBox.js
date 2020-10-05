import React, { Component } from 'react';

import './WordBox.css';

export default class WordBox extends Component {
  render() {
    const { correct_count, incorrect_count, original } = this.props.word;

    return (
      <div className="WordBox">
        <h4>{original}</h4>
        <p>correct answer count: {correct_count}</p>
        <p>incorrect answer count: {incorrect_count}</p>
      </div>
    );
  }
}
