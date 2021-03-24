import React from 'react';
import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {
  const handleLogout = () => {
    alert('logout');
  };

  const handleNewEntry = () => {
    alert('new entry');
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__side-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon" />

          <span> Bernhard</span>
        </h3>
        <div className="journal__sign-out" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt fa-2x" />
        </div>
      </div>

      <div className="journal__new-entry" onClick={handleNewEntry}>
        <i className="far fa-calendar-plus fa-5x" />
        <p className="mt-5">New entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};