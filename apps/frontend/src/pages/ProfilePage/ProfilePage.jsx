import './profilePage.css';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../data/dataHelper';

import SportLevelSelector from '../../components/SportLevelSelector/SportLevelSelector';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileScreen({ user }) {
  const [isEditing, setIsEditing] = useState(false);

  const [currentUser, setCurrentUser] = useState({ ...user });
  const [editedUser, setEditedUser] = useState({ ...user });

  if (!user) return <p className="no-user">Korisnik nije pronađen!</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setCurrentUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({ ...currentUser });
    setIsEditing(false);
    toast.success('Changes saved!');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
          Edit profile
        </button>

        <div className="profile-image-wrapper">
          <img
            src={currentUser.profileImage}
            alt={currentUser.username}
            className="profile-image"
          />
        </div>

        <div className="profile-info">
          <h2 className="profile-name">
            {isEditing ? (
              <>
                <input name="firstName" value={editedUser.firstName} onChange={handleChange} />
                <input name="lastName" value={editedUser.lastName} onChange={handleChange} />
              </>
            ) : (
              <>
                {currentUser.firstName} {currentUser.lastName}
              </>
            )}
          </h2>

          <p className="profile-username">@{currentUser.username}</p>
          <p className="profile-friends">{currentUser.friends} Friends</p>
        </div>
      </div>

      <div className="profile-section">
        <h3 className="section-title">Personal Details</h3>

        <div className="input-group">
          <label>Email</label>
          <input
            name="email"
            value={isEditing ? editedUser.email : currentUser.email}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="input-group">
          <label>Location</label>
          <input
            name="location"
            value={isEditing ? editedUser.location : currentUser.location}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="input-group">
          <label>Bio</label>
          <textarea
            name="bio"
            rows="3"
            value={isEditing ? editedUser.bio : currentUser.bio}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>
      </div>

      <div className="profile-section">
        <h3 className="section-title">Sports Preferences</h3>

        {isEditing ? (
          <SportLevelSelector
            sports={editedUser.sports}
            onChange={(updatedSports) =>
              setEditedUser((prev) => ({ ...prev, sports: updatedSports }))
            }
          />
        ) : (
          <div className="sports-list">
            {currentUser.sports.map((s) => (
              <div key={s.sportId} className="sport-item">
                <div>
                  <div className="sport-name">{s.sportName}</div>
                  <div className="sport-stats">
                    {s.gamesPlayed} games • {s.points} pts
                  </div>
                </div>
                <div className="sport-level">{s.level}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isEditing && (
        <div className="profile-actions">
          <button className="cancel-btn" onClick={handleCancel}>
            Odustani
          </button>
          <button className="save-btn" onClick={handleSave}>
            Spremi promjene
          </button>
        </div>
      )}
    </div>
  );
}

function ProfilePage() {
  const { id } = useParams();
  const user = getUserById(Number(id));

  if (!user) return <p>Korisnik nije pronađen.</p>;

  return (
    <div className="profile-page">
      <ProfileScreen user={user} />
      <ToastContainer />
    </div>
  );
}

export default ProfilePage;
