import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const [formValues, handleInputChange] = useForm(note);
  console.log(formValues);
  const { body, title, url } = formValues;

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Write here your title"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder="Write here your event 📝"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {url && (
          <div className="notes__image">
            <img
              src="http://www.taiwaneseamerican.org/wp-content/uploads/mree_kristina-450x304.jpg"
              alt="note-img"
            />
          </div>
        )}
      </div>
    </div>
  );
};
