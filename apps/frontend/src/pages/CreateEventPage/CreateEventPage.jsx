import { useState } from 'react';
import { SPORTS } from '../../data/sports';
import { USERS } from '../../data/users';
import { toast } from 'react-toastify';
import "./createEventPage.css";

function CreateEventPage() {
  //const {user} = useUser();
  
  // TEMPORARY: Za testiranje
  const user = { id: 1, name: 'Test User' };

  const [formData, setFormData] = useState({
    eventTitle: '',
    imageUrl: '',
    sportType: '',
    date: '',
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    location: '',
    participants: 4,
    points: 10,
    tags: '',
    description: ''
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
    
    if (!formData.sportType) {
      toast.error('Please select a sport');
      return;
    }
    
    const newEvent = {
      id: Date.now(),
      title: formData.eventTitle || 'Novi event',
      imageUrl: formData.imageUrl || '',
      sport: SPORTS.find(s => s.id === parseInt(formData.sportType)),
      creatorId: user.id,
      location: {
        name: formData.location,
        address: formData.location,
        lat: 0,
        lng: 0,
      },
      date: formData.date,
      time: formData.startTime,
      duration: 90,
      maxPlayers: formData.participants,
      currentPlayers: 1,
      participants: [
        { userId: user.id, status: 'confirmed' }
      ],
      description: formData.description || 'No description provided',
      requiredLevel: formData.requiredLevel || 'beginner',
      isPublic: true,
      createdAt: new Date().toISOString(),
      status: 'upcoming',
      points: formData.points,
    };

    const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
    existingEvents.push(newEvent);
    localStorage.setItem('events', JSON.stringify(existingEvents));
    
    console.log('Event saved:', newEvent);
    toast.success('Event successfully created! Check console for details.');
    
    setFormData({
      eventTitle: '',
      imageUrl: '',
      sportType: '',
      date: '',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      location: '',
      participants: 4,
      points: 10,
      tags: '',
      description: '',
      requiredLevel: ''
    });
  };

  const handleCancel = () => {
    toast.info('Event creation cancelled.');
    setFormData({
      eventTitle: '',
      imageUrl: '',
      sportType: '',
      date: '',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      location: '',
      participants: 4,
      points: 10,
      tags: '',
      description: ''
    });
  };

  return (
    <div className="create-event-page">
      <div className="event-container">
        <h1 className="event-title">Create New Event</h1>

        <form className="event-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Event Title</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Enter event title"
              name="eventTitle"
              value={formData.eventTitle}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Enter image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Sport Type</label>
            <select 
              className="form-select"
              name="sportType"
              value={formData.sportType}
              onChange={handleInputChange}
            >
              <option value="">Odaberi sport</option>
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

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              className="form-textarea" 
              placeholder="Enter event description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
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
