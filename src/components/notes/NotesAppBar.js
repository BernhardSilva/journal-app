import React from 'react';

export const NotesAppBar = () => {
  const handleSaveNote = () => {
    alert('Save note');
  };

  const handleUploadImage = () => {
    alert('Upload image');
  };

  return (
    <div className="notes__appbar">
      <span>19 de Junio 2021</span>
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
