import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <section className="Dashboard_Overview">
          <h2>You are learning Spanish</h2>
          <p>Total correct answers: {score}</p>
          <h3>Words to practice</h3>
          <Link to="/learn">Start practicing</Link>
        </section>

        <ul className="WordBox_Container">{this.renderWordBoxes(words)}</ul>
      </>
    );
  }
}
