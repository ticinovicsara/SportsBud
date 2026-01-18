import styles from './profilePage.module.css';
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

  if (!user) return <p className={styles['no-user']}>Korisnik nije pronađen!</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setCurrentUser(editedUser);
    setIsEditing(false);
    toast.success('Changes saved!');
  };

  const handleCancel = () => {
    setEditedUser({ ...currentUser });
    setIsEditing(false);
    toast.info('Edits canceled.');
  };

  return (
    <div className={styles['profile-container']}>
      <div className={styles['profile-header']}>
        <button className={styles['edit-profile-btn']} onClick={() => setIsEditing(true)}>
          Edit profile
        </button>

        <div className={styles['profile-image-wrapper']}>
          <img
            src={currentUser.profileImage}
            alt={currentUser.username}
            className={styles['profile-image']}
          />
        </div>

        <div className={styles['profile-info']}>
          <h2 className={styles['profile-name']}>
            {isEditing ? (
              <>
                <input
                  name="firstName"
                  value={editedUser.firstName}
                  onChange={handleChange}
                  className={styles['profile-input']}
                />
                <input
                  name="lastName"
                  value={editedUser.lastName}
                  onChange={handleChange}
                  className={styles['profile-input']}
                />
              </>
            ) : (
              <>
                {currentUser.firstName} {currentUser.lastName}
              </>
            )}
          </h2>

          <p className={styles['profile-username']}>@{currentUser.username}</p>
          <p className={styles['profile-friends']}>{currentUser.friends} Friends</p>
        </div>
      </div>

      <div className={styles['profile-section']}>
        <h3 className={styles['section-title']}>Personal Details</h3>

        <div className={styles['input-group']}>
          <label>Email</label>
          <input
            name="email"
            value={isEditing ? editedUser.email : currentUser.email}
            onChange={handleChange}
            readOnly={!isEditing}
            className={styles['profile-input']}
          />
        </div>

        <div className={styles['input-group']}>
          <label>Location</label>
          <input
            name="location"
            value={isEditing ? editedUser.location : currentUser.location}
            onChange={handleChange}
            readOnly={!isEditing}
            className={styles['profile-input']}
          />
        </div>

        <div className={styles['input-group']}>
          <label>Bio</label>
          <textarea
            name="bio"
            rows="3"
            value={isEditing ? editedUser.bio : currentUser.bio}
            onChange={handleChange}
            readOnly={!isEditing}
            className={styles['profile-textarea']}
          />
        </div>
      </div>

      <div className={styles['profile-section']}>
        <h3 className={styles['section-title']}>Sports Preferences</h3>

        {isEditing ? (
          <SportLevelSelector
            sports={editedUser.sports}
            onChange={(updatedSports) =>
              setEditedUser((prev) => ({ ...prev, sports: updatedSports }))
            }
          />
        ) : (
          <div className={styles['sports-list']}>
            {currentUser.sports.map((s) => (
              <div key={s.sportId} className={styles['sport-item']}>
                <div>
                  <div className={styles['sport-name']}>{s.sportName}</div>
                  <div className={styles['sport-stats']}>
                    {s.gamesPlayed} games • {s.points} pts
                  </div>
                </div>
                <div className={styles['sport-level']}>{s.level}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isEditing && (
        <div className={styles['profile-actions']}>
          <button className={styles['cancel-btn']} onClick={handleCancel}>
            Odustani
          </button>
          <button className={styles['save-btn']} onClick={handleSave}>
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

  if (!user) return <p className={styles['no-user']}>Korisnik nije pronađen.</p>;

  return (
    <div className={styles['profile-page']}>
      <ProfileScreen user={user} />
      <ToastContainer />
    </div>
  );
}

export default ProfilePage;
