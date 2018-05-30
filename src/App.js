import React, { Component } from 'react';
import './App.css';
import Intro from './Intro';
import Explanation from './Explanation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: '',
      saving: false,
      successMessage: '',
      seenIntro: localStorage.getItem('seenIntro') || false,
    };
    console.log(this.state);
  }

  handleKeyDown = (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const char = (e.metaKey ? '⌘-' : '') + String.fromCharCode(e.keyCode);
      if (char === '⌘-S') {
        e.preventDefault();
        this.saveNotes();
      }
    } else if (e.keyCode === 27) {
      // esc key
      document.getElementById('edit').blur();
    }
  };

  saveNotes = () => {
    this.handleBlur();
    this.setState({
      saving: true,
    });
    setTimeout(() => {
      this.setState({
        notes: '',
        saving: false,
        successMessage: this.getSuccessMessage(),
      });
    }, 4000);
  };

  getSuccessMessage = () => {
    const messages = [
      'Hooray! Notes saved! Thanks Machine Learning!',
      'Notes saved. (Summary (Using Machine Learning) Below)',
      'The Machine Learning algorithm has finished saving the important parts of your notes below.',
      'You just saved your notes. (Using Machine Learning!)',
      'Thank you for saving your notes with Machine Learning.',
      'Saving notes complete. (Summarized Summary using proprietary Machine Learning Below)',
      'Every time your save your notes, our Machine Learning gets better and better.',
    ];
    setTimeout(() => {
      this.setState({
        successMessage: '',
      });
    }, 2000);
    return messages[Math.floor(Math.random() * messages.length)];
  };

  handleChange = ({ target }) => {
    this.setState({
      notes: target.value,
    });
  };

  handleFocus = () => {
    document.getElementById('explanation').classList.add('dimmed');
  };

  handleBlur = () => {
    document.getElementById('explanation').classList.remove('dimmed');
  };

  toggleIntro = () => {
    localStorage.setItem('seenIntro', !this.state.seenIntro);
    this.setState({
      seenIntro: !this.state.seenIntro,
    });
  };

  render() {
    return (
      <div>
        <Intro seen={this.state.seenIntro} toggleIntro={this.toggleIntro} />

        {this.state.seenIntro && (
          <React.Fragment>
            <Explanation
              saveNotes={this.saveNotes}
              saving={this.state.saving}
              successMessage={this.state.successMessage}
            />
            <textarea
              disabled={this.state.saving}
              id="edit"
              onKeyDown={this.handleKeyDown}
              value={this.state.notes}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              placeholder="Start typing here"
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
