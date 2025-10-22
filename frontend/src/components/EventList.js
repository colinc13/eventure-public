import React, { useState } from 'react';

function EventList({ events, onSubmitRSVP }) {
  const [rsvpName, setRsvpName] = useState({});
  const [rsvpStatus, setRsvpStatus] = useState({});

  const handleRSVP = (eventId) => {
    const name = rsvpName[eventId];
    const status = rsvpStatus[eventId] || 'yes';

    if (!name) {
      alert('Please enter your name');
      return;
    }

    onSubmitRSVP(eventId, { name, status });
    setRsvpName({ ...rsvpName, [eventId]: '' });
  };

  return (
    <div className="event-list">
      <h2>Events</h2>
      {events.length === 0 ? (
        <p>No events yet. Create one above!</p>
      ) : (
        events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p className="event-date">Date: {event.date}</p>
            {event.description && <p>{event.description}</p>}

            <div className="rsvp-section">
              <h4>RSVPs ({event.rsvps.length})</h4>
              <ul>
                {event.rsvps.map((rsvp) => (
                  <li key={rsvp.id}>
                    {rsvp.name} - {rsvp.status}
                  </li>
                ))}
              </ul>

              <div className="rsvp-form">
                <input
                  type="text"
                  placeholder="Your name"
                  value={rsvpName[event.id] || ''}
                  onChange={(e) =>
                    setRsvpName({ ...rsvpName, [event.id]: e.target.value })
                  }
                />
                <select
                  value={rsvpStatus[event.id] || 'yes'}
                  onChange={(e) =>
                    setRsvpStatus({ ...rsvpStatus, [event.id]: e.target.value })
                  }
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="maybe">Maybe</option>
                </select>
                <button onClick={() => handleRSVP(event.id)}>RSVP</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default EventList;
