import { useState } from 'react';
import {SPORTS} from '../../data/sports'
import "./createEventPage.css";

function CreateEventPage() {

    const [formData, setFormData] = useState({
    sportType: '',
    date: '',
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    location: '',
    participants: 4,
    points: 10,
    tags: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCounterChange = (field, increment) => {
    setFormData(prev => ({
      ...prev,
      [field]: Math.max(1, prev[field] + (increment ? 1 : -1))
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Event created! Check console for data.');
  };

  const handleCancel = () => {
    console.log('Cancelled');
      setFormData({
      sportType: '',
      date: '',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      location: '',
      participants: 4,
      points: 10,
      tags: ''
    });
  };

  return (
     <div className="create-event-page">
      <div className="event-container">
        <h1 className="event-title">Create New Event</h1>

        <form className="event-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Sport Type</label>
            <select 
              className="form-select"
              name="sportType"
              value={formData.sportType}
              onChange={handleInputChange}
            >
              <option value="">Choose sport</option>
              {SPORTS.map(sport => (
                <option key={sport.id} value={sport.id}>
                  {sport.icon} {sport.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="MM/DD/YYYY"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Time</label>
              <input 
                type="text" 
                className="form-input" 
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">End Time</label>
              <input 
                type="text" 
                className="form-input" 
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Enter location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Number of Participants</label>
              <div className="counter">
                <button 
                  type="button" 
                  className="counter-btn"
                  onClick={() => handleCounterChange('participants', false)}
                >
                  -
                </button>
                <span className="counter-value">{formData.participants}</span>
                <button 
                  type="button" 
                  className="counter-btn"
                  onClick={() => handleCounterChange('participants', true)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Points awarded</label>
              <div className="counter">
                <button 
                  type="button" 
                  className="counter-btn"
                  onClick={() => handleCounterChange('points', false)}
                >
                  -
                </button>
                <span className="counter-value">{formData.points}</span>
                <button 
                  type="button" 
                  className="counter-btn"
                  onClick={() => handleCounterChange('points', true)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label tags-label">
              <span className="hash-icon">#</span> Event tags
            </label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Create Event
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEventPage;
