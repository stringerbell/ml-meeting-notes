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
        notes: this.getSummary(),
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
    }, 5000);

    return this.randomItem(messages);
  };

  getSummary = () => {
    const summaries = [
      'Overpaid executive talked about synergy for 45 min',
      '"Bob". We don\'t care about your cat.',
      'I held in a fart for this?',
      'One full hour closer to the sweet release of death',
      'Ended up on youtube again looking at funny cat videos',
      "Literally no way I'm ever going to get that time back. Ever.",
      'We may have nailed down the color to paint the bike shed but ' +
      "we'll follow up and revisit the decision offline and again in " +
      "the next meeting where we'll be rehashing all the points we didn't make again.",
      'Pretty sure this meeting is because "Bob" likes to hear the sound of his own voice.',
      "Don't worry, you'll be able to make more notes in the next meeting",
      'Crud! I missed the last part, try again',
      'Sorry, I fell asleep reading that. Take notes of something more exciting.',
      'Skinless chicken or turkey breasts\n' +
      'Ground turkey or chicken\n' +
      'Salmon, halibut, trout, mackerel, or your favorite seafood\n' +
      'Reduced-sodium lunchmeat (turkey, roast beef)',
      'I made a dragon while you were taking notes: here you go:\n' +
      '                      ,-,-      \n' +
      '                     / / |      \n' +
      "   ,-'             _/ / /       \n" +
      "  (-_          _,-' `Z_/        \n" +
      '   "#:      ,-\'_,-.    \\  _     \n' +
      "    #'    _(_-'_()\\     \\\" |    \n" +
      "  ,--_,--'                 |    \n" +
      ' / ""                      L-\'\\ \n' +
      ' \\,--^---v--v-._        /   \\ | \n' +
      "   \\_________________,-'      | \n" +
      '                    \\           \n' +
      '                     \\          \n' +
      '                      \\     \n' +
      '\n' +
      '\n',
      'Seems like your meeting sucks. Would you like some help with that?\n' +
      'https://i.giphy.com/media/13V60VgE2ED7oc/giphy.webp',
    ];

    return this.randomItem(summaries);
  };

  randomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  handleChange = ({ target }) => {
    this.setState({
      notes: target.value,
    });
  };

  handleFocus = () => {
    let classlist = document.getElementById('explanation').classList;
    classlist.add('dimmed');
    classlist.remove('undimmed');
  };

  handleBlur = () => {
    let classlist = document.getElementById('explanation').classList;
    classlist.remove('dimmed');
    classlist.add('undimmed');
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
