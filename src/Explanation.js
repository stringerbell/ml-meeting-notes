import React from 'react';
import Image from './spinner.gif'

export default function Explanation({saveNotes, saving, successMessage}) {
  return (
      <div id={'explanation'}>
        <h1>Minimalist meeting notes</h1>
        <h5>
          Write your meeting notes below. (press ⌘+S to save, or press the
          Save button)
        </h5>
        <p>
          <button
              className={'btn'}
              onClick={saveNotes}
              disabled={saving}
          >
            {saving && <img alt={'loading-spinner'} src={Image} width={55} />}
            {!saving && 'Save'}
          </button>
        </p>
        <p>{successMessage}</p>
      </div>
  )
}
