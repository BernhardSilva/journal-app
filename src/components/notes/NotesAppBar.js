import React from 'react';

export const NotesAppBar = () => {
  return (
    <div className="notes__appbar">
      <span>19 de Junio 2021</span>
      <div className="btn__notes">
        <div>
          <button className="btn btn__notes">Picture</button>
        </div>
        <div>
          <button className="btn btn__notes">Save</button>
        </div>
      </div>
    </div>
  );
};
