from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)

# In-memory storage
events = {}

@app.route('/api/events', methods=['GET'])
def get_events():
    return jsonify(list(events.values()))

@app.route('/api/events', methods=['POST'])
def create_event():
    data = request.json
    event_id = str(uuid.uuid4())
    event = {
        'id': event_id,
        'title': data.get('title'),
        'date': data.get('date'),
        'description': data.get('description', ''),
        'rsvps': []
    }
    events[event_id] = event
    return jsonify(event), 201

@app.route('/api/events/<event_id>/rsvp', methods=['POST'])
def rsvp_event(event_id):
    if event_id not in events:
        return jsonify({'error': 'Event not found'}), 404

    data = request.json
    rsvp = {
        'id': str(uuid.uuid4()),
        'name': data.get('name'),
        'status': data.get('status', 'yes'),
        'timestamp': datetime.now().isoformat()
    }
    events[event_id]['rsvps'].append(rsvp)
    return jsonify(events[event_id])

if __name__ == '__main__':
    app.run(debug=True, port=5000)
