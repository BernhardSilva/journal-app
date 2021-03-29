import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {
  const dispatch = useDispatch();

  //useSelector para tomar los datos de auth: { name: abcd}
  const state = useSelector((state) => state.auth);

  const { name } = state;

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const addNewEntry = () => {
    dispatch(startNewNote());
    alert('new entry');
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__side-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon" />

          <span> {name}</span>
        </h3>
        <div className="journal-sign-out" title="Logout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt fa-2x" />
        </div>
      </div>

      <div className="journal__new-entry" onClick={addNewEntry}>
        <i className="far fa-calendar-plus fa-5x" />
        <p className="mt-5">New entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};
