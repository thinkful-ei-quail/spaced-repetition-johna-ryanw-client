import React, { Component } from 'react';

export default class Dashboard extends Component {
  render() {
    return (
      <>
        <h2>You are learning Spanish</h2>

        <p>Total Score is 28</p>

        <h3>Words to Practice</h3>

        <div>
          <p>tormenta</p>
          <p>correct answer count: 2</p>
          <p>incorrect answer count: 8</p>
        </div>
      </>
    );
  }
}
