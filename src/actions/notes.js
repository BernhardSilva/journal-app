import { toast, uploaderImg, closeUploaderImg } from '../helpers/messages';
import { db } from '../firebase/firebase-config';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';
import { fileUpload } from '../helpers/fileUpload';
// import Swal from 'sweetalert2';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    try {
      const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
      dispatch(activeNote(doc.id, newNote));
      toast.fire({
        position: 'top-start',
        icon: 'success',
        title: 'New entry added',
      });
    } catch (error) {
      console.log(error);
      toast.fire({
        position: 'top-start',
        icon: 'error',
        title: `"Add new entry" failed, error communication with the database, check your internet connection and try again`,
      });
    }
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    try {
      await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
      dispatch(refreshNote(note.id, noteToFirestore));
      toast.fire({
        position: 'top-end',
        icon: 'success',
        title: `Your note "${note.title}" has been saved`,
      });
    } catch (error) {
      console.log(error);
      toast.fire({
        position: 'top-end',
        icon: 'error',
        title: `"${note.title}" save failed, error communication with the database, check your internet connection and try again`,
      });
    }
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startUploadingImage = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    uploaderImg.fire();

    const fileUrl = await fileUpload(file);
    // console.log(fileUrl);
    activeNote.url = fileUrl;

    dispatch(startSaveNote(activeNote));

    closeUploaderImg.fire();
  };
};
