import React, { Component } from 'react';
import ApiService from '../../services/api-service';
import WordBox from '../WordBox/WordBox';

import './Dashboard.css';

export default class Dashboard extends Component {
  state = {
    error: null,
    language: '',
    score: 0,
    words: []
  };

  componentDidMount() {
    ApiService.getLanguage().then((data) => {
      this.setState({
        language: data.language.name,
        score: data.language.total_score,
        words: data.words
      });
    });
  }

  renderWordBoxes(words) {
    let wordBoxContent = words.map((word) => {
      return <WordBox key={word.id} word={word} />;
    });
    return wordBoxContent;
  }

  render() {
    const { score, words } = this.state;
    return (
      <>
        <div className="Dashboard_Overview">
          <h2>You are learning Spanish</h2>
          <p>Total Score is {score}</p>
          <h3>Words to Practice</h3>
        </div>

        <div className="WordBox_Container">{this.renderWordBoxes(words)}</div>
      </>
    );
  }
}
