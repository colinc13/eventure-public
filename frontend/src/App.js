import React, { useState, useEffect } from 'react';
import './App.css';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/events`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const createEvent = async (eventData) => {
    try {
      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
      const newEvent = await response.json();
      setEvents([...events, newEvent]);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const submitRSVP = async (eventId, rsvpData) => {
    try {
      const response = await fetch(`${API_URL}/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rsvpData),
      });
      const updatedEvent = await response.json();
      setEvents(events.map(event =>
        event.id === eventId ? updatedEvent : event
      ));
    } catch (error) {
      console.error('Error submitting RSVP:', error);
    }
  };

  return (
    <div className="App">
      <h1>Eventure</h1>
      <EventForm onCreateEvent={createEvent} />
      <EventList events={events} onSubmitRSVP={submitRSVP} />
    </div>
  );
}

export default App;
