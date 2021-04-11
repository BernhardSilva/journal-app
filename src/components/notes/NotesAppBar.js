import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploadingImage } from '../../actions/notes';

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const handleSaveNote = () => {
    dispatch(startSaveNote(active));
  };

  const handleUploadImage = () => {
    document.querySelector('#fileSelector').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploadingImage(file));
    }
  };

  return (
    <div className="notes__appbar">
      <span>19 de Junio 2021</span>
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
