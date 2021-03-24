import React from 'react';

export const JournalEntry = () => {
  const handleJournalEntry = () => {
    alert('Journal entry');
  };

  return (
    <div className="journal__entry" onClick={handleJournalEntry}>
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://p1.music.126.net/RqSlWETdTdFmi_rAB31xBA==/5886785255438153.jpg?param=640y520)',
        }}
      ></div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">A new day</p>
        <p className="journal__entry-content">
          Veniam fugiat culpa incididunt dolore velit esse ullamco in non.
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>15</h4>
      </div>
    </div>
  );
};
