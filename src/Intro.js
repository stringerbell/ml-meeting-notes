import React from 'react';

export default function Intro({ seen, toggleIntro }) {
  if (seen) {
    return (
      <div style={{ float: 'left', paddingTop: '1em' }}>
        <a href={'#'} onClick={toggleIntro}>
          About
        </a>
      </div>
    );
  }

  return (
    <div className={'explanation'}>
      <h1>Use Machine Learning to easily summarize your meeting notes.</h1>
      <p>How it works:</p>
      <ul className={'instructions'}>
        <li>
          - You type in your meeting notes. (The more detailed the better)
        </li>
        <li>- When your meeting is over, hit save (or press ⌘+S on MacOS)</li>
        <li>- Marvel at the resulting simplicity.</li>
      </ul>
      <p>Your boss will really thank you for your super succinct summary.</p>
      <br />
      <button onClick={toggleIntro} className={'btn'}>
        Shut up and take my money
      </button>
    </div>
  );
}
