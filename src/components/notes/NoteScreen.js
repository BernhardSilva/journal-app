import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Write here your title"
          className="notes__title-input"
          autoComplete="off"
        />

        <textarea
          placeholder="Write here your event 📝"
          className="notes__textarea"
        ></textarea>

        <div className="notes__image">
          <img
            src="http://www.taiwaneseamerican.org/wp-content/uploads/mree_kristina-450x304.jpg"
            alt="note-img"
          />
        </div>
      </div>
    </div>
  );
};
