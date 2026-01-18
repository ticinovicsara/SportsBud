import { useState } from 'react';
import { SPORTS } from '../../data/sports';
import { USERS } from '../../data/users';
import { toast } from 'react-toastify';
import styles from './createEventPage.module.css';
import { EVENTS } from '../../data';

function CreateEventPage() {
  //const {user} = useUser();

  // TEMPORARY: Za testiranje
  const userId = 1;

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
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Validacijska funkcija za URL
  const isValidUrl = (url) => {
    if (!url) return true; // URL je opcionalan
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Validacija datuma (MM/DD/YYYY format i mora biti u budućnosti)
  const isValidDate = (dateString) => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!regex.test(dateString)) return false;

    const [month, day, year] = dateString.split('/').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Provjeri je li datum validan i u budućnosti
    return inputDate >= today && inputDate.getMonth() === month - 1;
  };

  // Validacija vremena (HH:MM AM/PM format)
  const isValidTime = (timeString) => {
    const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
    return regex.test(timeString);
  };

  // Provjera je li End Time nakon Start Time
  const isEndTimeAfterStartTime = (startTime, endTime) => {
    const parseTime = (timeStr) => {
      const [time, period] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      
      if (period.toUpperCase() === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period.toUpperCase() === 'AM' && hours === 12) {
        hours = 0;
      }
      
      return hours * 60 + minutes;
    };

    return parseTime(endTime) > parseTime(startTime);
  };

  // Validacija cijelog forme
  const validateForm = () => {
    const newErrors = {};

    // Event Title validacija
    if (!formData.eventTitle.trim()) {
      newErrors.eventTitle = 'Event title is required';
    } else if (formData.eventTitle.length < 3) {
      newErrors.eventTitle = 'Event title must be at least 3 characters';
    } else if (formData.eventTitle.length > 100) {
      newErrors.eventTitle = 'Event title must be less than 100 characters';
    }

    // Image URL validacija
    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }

    // Sport Type validacija
    if (!formData.sportType) {
      newErrors.sportType = 'Please select a sport type';
    }

    // Date validacija
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (!isValidDate(formData.date)) {
      newErrors.date = 'Please enter a valid future date (MM/DD/YYYY)';
    }

    // Start Time validacija
    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    } else if (!isValidTime(formData.startTime)) {
      newErrors.startTime = 'Please enter valid time (HH:MM AM/PM)';
    }

    // End Time validacija
    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    } else if (!isValidTime(formData.endTime)) {
      newErrors.endTime = 'Please enter valid time (HH:MM AM/PM)';
    } else if (isValidTime(formData.startTime) && !isEndTimeAfterStartTime(formData.startTime, formData.endTime)) {
      newErrors.endTime = 'End time must be after start time';
    }

    // Location validacija
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (formData.location.length < 3) {
      newErrors.location = 'Location must be at least 3 characters';
    }

    // Participants validacija
    if (formData.participants < 2) {
      newErrors.participants = 'Minimum 2 participants required';
    } else if (formData.participants > 100) {
      newErrors.participants = 'Maximum 100 participants allowed';
    }

    // Points validacija
    if (formData.points < 1) {
      newErrors.points = 'Minimum 1 point required';
    } else if (formData.points > 1000) {
      newErrors.points = 'Maximum 1000 points allowed';
    }

    // Description validacija
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    // Tags validacija (opcionalno)
    if (formData.tags && formData.tags.length > 100) {
      newErrors.tags = 'Tags must be less than 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Filtriraj usere na temelju search term-a
  const filteredUsers = USERS.filter((user) => {
    if (user.id === userId) return false; // Ne prikazuj kreатora eventa
    if (selectedUsers.find((u) => u.id === user.id)) return false; // Ne prikazuj već odabrane
    
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const username = user.username.toLowerCase();
    const search = searchTerm.toLowerCase();
    
    return fullName.includes(search) || username.includes(search);
  });

  // Dodaj usera u selekciju
  const handleAddUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSearchTerm('');
    setShowDropdown(false);
  };

  // Ukloni usera iz selekcije
  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Očisti error za to polje kada korisnik počne tipkati
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleCounterChange = (field, increment) => {
    const newValue = Math.max(1, formData[field] + (increment ? 1 : -1));
    
    setFormData((prev) => ({
      ...prev,
      [field]: newValue,
    }));

    // Očisti error za to polje
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pokreni validaciju
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: formData.eventTitle,
      imageUrl: formData.imageUrl || '',
      sport: SPORTS.find((s) => s.id === parseInt(formData.sportType)),
      creatorId: userId,
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
      currentPlayers: 1 + selectedUsers.length,
      participants: [
        { userId: userId, status: 'confirmed' },
        ...selectedUsers.map((user) => ({ userId: user.id, status: 'confirmed' })),
      ],
      description: formData.description,
      requiredLevel: formData.requiredLevel || 'beginner',
      isPublic: true,
      createdAt: new Date().toISOString(),
      status: 'upcoming',
      points: formData.points,
      tags: formData.tags || '',
    };

    try {
      const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
      existingEvents.push(newEvent);
      localStorage.setItem('events', JSON.stringify(existingEvents));

      console.log('Event saved:', newEvent, existingEvents);
      toast.success('Event successfully created!');

      // Reset forme
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
        requiredLevel: '',
      });
      setErrors({});
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to create event. Please try again.');
    }
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
      description: '',
    });
    setErrors({});
    setSelectedUsers([]);
  };

  return (
    <div className={styles['create-event-page']}>
      <div className={styles['event-container']}>
        <h1 className={styles['event-title']}>Create New Event</h1>

        <form className={styles['event-form']} onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <label className={styles['form-label']}>Event Title *</label>
            <input
              type="text"
              className={`${styles['form-input']} ${errors.eventTitle ? styles['input-error'] : ''}`}
              placeholder="Enter event title"
              name="eventTitle"
              value={formData.eventTitle}
              onChange={handleInputChange}
            />
            {errors.eventTitle && (
              <span className={styles['error-message']}>{errors.eventTitle}</span>
            )}
          </div>

          <div className={styles['form-group']}>
            <label className={styles['form-label']}>Image URL</label>
            <input
              type="text"
              className={`${styles['form-input']} ${errors.imageUrl ? styles['input-error'] : ''}`}
              placeholder="Enter image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
            />
            {errors.imageUrl && (
              <span className={styles['error-message']}>{errors.imageUrl}</span>
            )}
          </div>

          <div className={styles['form-group']}>
            <label className={styles['form-label']}>Sport Type *</label>
            <select
              className={`${styles['form-select']} ${errors.sportType ? styles['input-error'] : ''}`}
              name="sportType"
              value={formData.sportType}
              onChange={handleInputChange}
            >
              <option value="">Odaberi sport</option>
              {SPORTS.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.icon} {sport.name}
                </option>
              ))}
            </select>
            {errors.sportType && (
              <span className={styles['error-message']}>{errors.sportType}</span>
            )}
          </div>

          <div className={styles['form-group']}>
            <label className={styles['form-label']}>Date *</label>
            <input
              type="text"
              className={`${styles['form-input']} ${errors.date ? styles['input-error'] : ''}`}
              placeholder="MM/DD/YYYY"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
            {errors.date && (
              <span className={styles['error-message']}>{errors.date}</span>
            )}
          </div>

          <div className={styles['form-row']}>
            <div className={styles['form-group']}>
              <label className={styles['form-label']}>Start Time *</label>
              <input
                type="text"
                className={`${styles['form-input']} ${errors.startTime ? styles['input-error'] : ''}`}
                placeholder="10:00 AM"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
              />
              {errors.startTime && (
                <span className={styles['error-message']}>{errors.startTime}</span>
              )}
            </div>

            <div className={styles['form-group']}>
              <label className={styles['form-label']}>End Time *</label>
              <input
                type="text"
                className={`${styles['form-input']} ${errors.endTime ? styles['input-error'] : ''}`}
                placeholder="12:00 PM"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
              />
              {errors.endTime && (
                <span className={styles['error-message']}>{errors.endTime}</span>
              )}
            </div>
          </div>

          <div className={styles['form-group']}>
            <label className={styles['form-label']}>Location *</label>
            <input
              type="text"
              className={`${styles['form-input']} ${errors.location ? styles['input-error'] : ''}`}
              placeholder="Enter location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
            {errors.location && (
              <span className={styles['error-message']}>{errors.location}</span>
            )}
          </div>

          <div className={styles['form-row']}>
            <div className={styles['form-group']}>
              <label className={styles['form-label']}>Number of Participants *</label>
              <div className={styles['counter']}>
                <button
                  type="button"
                  className={styles['counter-btn']}
                  onClick={() => handleCounterChange('participants', false)}
                >
                  -
                </button>
                <span className={styles['counter-value']}>{formData.participants}</span>
                <button
                  type="button"
                  className={styles['counter-btn']}
                  onClick={() => handleCounterChange('participants', true)}
                >
                  +
                </button>
              </div>
              {errors.participants && (
                <span className={styles['error-message']}>{errors.participants}</span>
              )}
            </div>

            <div className={styles['form-group']}>
              <label className={styles['form-label']}>Points awarded *</label>
              <div className={styles['counter']}>
                <button
                  type="button"
                  className={styles['counter-btn']}
                  onClick={() => handleCounterChange('points', false)}
                >
                  -
                </button>
                <span className={styles['counter-value']}>{formData.points}</span>
                <button
                  type="button"
                  className={styles['counter-btn']}
                  onClick={() => handleCounterChange('points', true)}
                >
                  +
                </button>
              </div>
              {errors.points && (
                <span className={styles['error-message']}>{errors.points}</span>
              )}
            </div>
          </div>

          <div className={styles['form-group']}>
            <label className={styles['form-label tags-label']}>
              <span className={styles['hash-icon']}>#</span> Event tags
            </label>
            <input
              type="text"
              className={`${styles['form-input']} ${errors.tags ? styles['input-error'] : ''}`}
              placeholder="Tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
            />
            {errors.tags && (
              <span className={styles['error-message']}>{errors.tags}</span>
            )}
          </div>

          <div className={styles['form-group']}>
            <label className={styles['form-label']}>Invite Users (Optional)</label>
            <div className={styles['user-selector']}>
              <input
                type="text"
                className={styles['form-input']}
                placeholder="Search users by name or username..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
              
              {showDropdown && searchTerm && filteredUsers.length > 0 && (
                <div className={styles['user-dropdown']}>
                  {filteredUsers.slice(0, 5).map((user) => (
                    <div
                      key={user.id}
                      className={styles['user-item']}
                      onClick={() => handleAddUser(user)}
                    >
                      <img
                        src={user.profileImage}
                        alt={user.firstName}
                        className={styles['user-avatar']}
                      />
                      <div className={styles['user-info']}>
                        <span className={styles['user-name']}>
                          {user.firstName} {user.lastName}
                        </span>
                        <span className={styles['user-username']}>@{user.username}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedUsers.length > 0 && (
                <div className={styles['selected-users']}>
                  {selectedUsers.map((user) => (
                    <div key={user.id} className={styles['selected-user-chip']}>
                      <img
                        src={user.profileImage}
                        alt={user.firstName}
                        className={styles['chip-avatar']}
                      />
                      <span className={styles['chip-name']}>
                        {user.firstName} {user.lastName}
                      </span>
                      <button
                        type="button"
                        className={styles['chip-remove']}
                        onClick={() => handleRemoveUser(user.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles['form-group']}>
            <label className={styles['form-label']}>Description *</label>
            <textarea
              className={`${styles['form-textarea']} ${errors.description ? styles['input-error'] : ''}`}
              placeholder="Enter event description (min 10 characters)"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
            />
            {errors.description && (
              <span className={styles['error-message']}>{errors.description}</span>
            )}
          </div>

          <div className={styles['button-group']}>
            <button type="submit" className={styles['btn-primary']}>
              Create Event
            </button>
            <button type="button" className={styles['btn-secondary']} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEventPage;