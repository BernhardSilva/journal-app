import React, { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleteNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const { id, body, title } = formValues;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeleteNote(id));
      }
    });
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Write here your title"
          className="notes__title-input"
          autoComplete="off"
          name="title"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder="Write here your event 📝"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {note.url && (
          <div className="notes__image">
            <img
              src={note.url}
              alt="note-img"
              name="url"
              value={note.url}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
