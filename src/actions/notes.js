import {
  toast,
  toastError,
  uploaderImg,
  closeUploaderImg,
} from '../helpers/messages';
import { db } from '../firebase/firebase-config';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';
import { fileUpload } from '../helpers/fileUpload';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      url: '',
      date: new Date().getTime(),
    };

    try {
      const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

      dispatch(activeNote(doc.id, newNote));
      dispatch(addNewNote(doc.id, newNote));

      toast.fire({
        position: 'top-start',
        icon: 'success',
        title: 'Entry added',
      });
    } catch (error) {
      console.log(error);
      toastError.fire({
        position: 'top-start',
        title: `"New entry" failed, communication error with the database, please check your internet connection and try again`,
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

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    try {
      const notes = await loadNotes(uid);
      dispatch(setNotes(notes));
    } catch (error) {
      console.log(error);
      toastError.fire({
        title:
          '"Load Notes" failed, communication error with the database, please check your internet connection and try again',
      });
    }
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
        position: 'top',
        icon: 'success',
        title: `Your note "${note.title}" has been saved`,
      });
    } catch (error) {
      console.log(error);
      toastError.fire({
        // position: 'top',
        title: `"${note.title}" save failed, communication error with the database, please check your internet connection and try again`,
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

export const startDeleteNote = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    try {
      await db.doc(`${uid}/journal/notes/${id}`).delete();
      dispatch(deleteNote(id));
      toast.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Note deleted',
      });
    } catch (error) {
      console.log(error);
      toastError.fire({
        position: 'bottom-end',
        title:
          '"Delete note" failed, error communication with the database, please check your internet connection and try again',
      });
    }
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});
