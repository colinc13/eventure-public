import React, { useState } from 'react';

function EventForm({ onCreateEvent }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) {
      alert('Please fill in title and date');
      return;
    }
    onCreateEvent({ title, date, description });
    setTitle('');
    setDate('');
    setDescription('');
  };

  return (
    <div className="event-form">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default EventForm;
