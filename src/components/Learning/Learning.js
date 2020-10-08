import React, { Component } from 'react';
import ApiService from '../../services/api-service';
import Button from '../Button/Button';
import { Input, Label } from '../Form/Form';

import './Learning.css';

class Learning extends Component {
  state = {
    error: null,
    showResults: false,
    correct: 0,
    incorrect: 0,
    nextWord: '',
    totalScore: 0,
    isCorrect: false,
    original: '',
    translation: '',
    guess: ''
  };

  componentDidMount() {
    this.getFirstWord();
    console.log('word up');
  }

  getFirstWord = () => {
    ApiService.getNextWord().then((data) => {
      console.log(data);
      this.setState({
        showResults: false,
        nextWord: data.nextWord,
        ordinal: data.nextWord,
        totalScore: data.totalScore,
        wordCorrectCount: data.wordCorrectCount,
        wordIncorrectCount: data.wordIncorrectCount
      });
    });
  };

  getNextWord = () => {
    ApiService.getNextWord().then((data) => {
      this.setState({
        original: data.nextWord,
        wordCorrectCount: data.wordCorrectCount,
        wordIncorrectCount: data.wordIncorrectCount,
        showResults: false
      });
    });
  };

  handleGuess = (e) => {
    e.preventDefault();

    let guess = e.target['learn-guess-input'].value;
    guess = guess.toLowerCase();
    this.setState({
      guess
    });

    ApiService.getAnswer(guess).then((data) => {
      this.setState({
        nextWord: data.nextWord,
        totalScore: data.totalScore,
        wordCorrectCount: data.wordCorrectCount,
        wordIncorrectCount: data.wordIncorrectCount,
        isCorrect: data.isCorrect,
        showResults: true,
        translation: data.answer
      });
    });
  };

  handleNextWord = (e) => {
    e.preventDefault();
    this.setState({
      showResults: false
    });
    this.getNextWord();
  };

  renderNextWord = () => {
    const { nextWord, wordCorrectCount, wordIncorrectCount } = this.state;
    return (
      <section>
        <h2>Translate the word:</h2>
        <span className="nextWord_span">{nextWord}</span>
        <p> You have answered this word correctly {wordCorrectCount} times. </p>
        <p>
          {' '}
          You have answered this word incorrectly {
            wordIncorrectCount
          } times.{' '}
        </p>
        <form onSubmit={this.handleGuess} className="Learning_form">
          <Label htmlFor="learn-guess-input">
            What's the translation for this word?
          </Label>
          <Input
            type="text"
            name="learn-guess-input"
            id="learn-guess-input"
            required
          ></Input>
          <Button type="submit">Submit your answer</Button>
        </form>
      </section>
    );
  };

  renderAnswer = () => {
    let { original, translation, guess, isCorrect } = this.state;

    return (
      <section className="answer_section">
        {isCorrect ? (
          <h2>You were correct!</h2>
        ) : (
          <h2>Good try, but not quite right!</h2>
        )}
        <p>
          The correct translation for {original} was {translation} and you chose{' '}
          {guess}
        </p>
        <Button onClick={this.handleNextWord}>Try another word</Button>
      </section>
    );
  };

  render() {
    let { totalScore } = this.state;
    return (
      <div className="Learning">
        <section className="Scoreboard">
          <p>Your total score is: {totalScore}</p>
        </section>
        {this.state.showResults ? this.renderResults() : this.renderNextWord()}
      </div>
    );
  }
}

export default Learning;
