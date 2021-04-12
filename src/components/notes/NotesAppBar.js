import React from 'react';
import moment from 'moment';
import { toast } from '../../helpers/messages';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploadingImage } from '../../actions/notes';

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);

  const date = moment(note.date);

  const handleSaveNote = () => {
    if (!note.title) {
      toast.fire({
        position: 'top',
        icon: 'info',
        title: 'Please enter a title',
      });
    } else {
      dispatch(startSaveNote(note));
    }
  };

  const handleUploadImage = () => {
    document.querySelector('#fileSelector').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        toast.fire({
          position: 'top',
          icon: 'warning',
          title: 'Invalid image, please select a valid image!',
        });
        return false;
      } else {
        dispatch(startUploadingImage(file));
        return true;
      }
    }
  };

  return (
    <div className="notes__appbar">
      <span>{date.format('dddd, MMMM Do YYYY, h:mm a')}</span>
      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div className="btn-notes">
        <div
          className="btn btn-notes"
          title="Upload image"
          onClick={handleUploadImage}
        >
          <i className="fas fa-upload fa-2x" />
        </div>

        <div
          className="btn btn-notes"
          title="Save Note"
          onClick={handleSaveNote}
        >
          <i className="fas fas fa-save fa-2x" />
        </div>
      </div>
    </div>
  );
};
