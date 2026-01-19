import styles from './profilePage.module.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { getUserById } from '../../data/dataHelper';
import { USERS } from '../../data/users';
import { useNavigate } from 'react-router-dom';
import SportLevelSelector from '../../components/SportLevelSelector/SportLevelSelector';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileScreen({ user, canEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ ...user });
  const [editedUser, setEditedUser] = useState({ ...user });
  const [friendStatus, setFriendStatus] = useState('none'); // none, pending, friends
  const navigate = useNavigate();
  const { user: loggedInUser } = useUser();

  if (!user) return <p className={styles['no-user']}>Korisnik nije pronađen!</p>;

  const { logout } = useUser();

  useEffect(() => {
    setCurrentUser({ ...user });
    setEditedUser({ ...user });
    setIsEditing(false);
    
    // Check friend status
    if (loggedInUser && !canEdit) {
      const friendRequests = JSON.parse(localStorage.getItem('friendRequests') || '[]');
      const existingRequest = friendRequests.find(
        (req) => 
          (req.fromUserId === loggedInUser.id && req.toUserId === user.id) ||
          (req.fromUserId === user.id && req.toUserId === loggedInUser.id)
      );
      
      if (existingRequest) {
        setFriendStatus(existingRequest.status);
      } else {
        setFriendStatus('none');
      }
    }
  }, [user, loggedInUser, canEdit]);

  const handleLogout = () => {
    logout();
    toast.info('Logged out');
    navigate('/login');
  };

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

  const handleAddFriend = () => {
    if (!loggedInUser) {
      toast.error('Please log in to add friends');
      return;
    }

    const friendRequests = JSON.parse(localStorage.getItem('friendRequests') || '[]');
    
    friendRequests.push({
      id: Date.now(),
      fromUserId: loggedInUser.id,
      toUserId: user.id,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    
    localStorage.setItem('friendRequests', JSON.stringify(friendRequests));
    setFriendStatus('pending');
    toast.success('Friend request sent!');
  };

  const handleCancelRequest = () => {
    const friendRequests = JSON.parse(localStorage.getItem('friendRequests') || '[]');
    const updatedRequests = friendRequests.filter(
      (req) => !(req.fromUserId === loggedInUser.id && req.toUserId === user.id)
    );
    
    localStorage.setItem('friendRequests', JSON.stringify(updatedRequests));
    setFriendStatus('none');
    toast.info('Friend request canceled');
  };

  const renderFriendButton = () => {
    if (canEdit) return null; // Ne prikazuj na svom profilu

    switch (friendStatus) {
      case 'friends':
        return (
          <button className={styles['friend-status-btn']} disabled>
            ✓ Friends
          </button>
        );
      case 'pending':
        return (
          <button className={styles['friend-pending-btn']} onClick={handleCancelRequest}>
            Request Sent
          </button>
        );
      default:
        return (
          <button className={styles['add-friend-btn']} onClick={handleAddFriend}>
            ➕ Add Friend
          </button>
        );
    }
  };

  return (
    <div className={styles['profile-container']}>
      <div className={styles['profile-header']}>
        {canEdit && (
          <button className={styles['edit-profile-btn']} onClick={() => setIsEditing(true)}>
            Edit profile
          </button>
        )}

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
          <p className={styles['profile-friends']}>👥 {currentUser.friends} Friends</p>
          
          {/* Add Friend Button */}
          {renderFriendButton()}
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

      {/* Friends Section */}
      <div className={styles['profile-section']}>
        <h3 className={styles['section-title']}>Friends ({currentUser.friends})</h3>
        <div className={styles['friends-grid']}>
          {USERS
            .filter((u) => u.id !== currentUser.id)
            .slice(0, Math.min(6, currentUser.friends || 3))
            .map((friend) => (
              <Link 
                key={friend.id} 
                to={`/profile/${friend.id}`}
                className={styles['friend-item']}
              >
                <img
                  src={friend.profileImage}
                  alt={friend.firstName}
                  className={styles['friend-item-avatar']}
                />
                <span className={styles['friend-item-name']}>
                  {friend.firstName} {friend.lastName}
                </span>
              </Link>
            ))}
        </div>
      </div>

      {canEdit && isEditing && (
        <div className={styles['profile-actions']}>
          <button className={styles['cancel-btn']} onClick={handleCancel}>
            Odustani
          </button>
          <button className={styles['save-btn']} onClick={handleSave}>
            Spremi promjene
          </button>
        </div>
      )}

      {canEdit && (
        <button className={styles['logout-button']} onClick={handleLogout} replace={true}>
          Logout
        </button>
      )}
    </div>
  );
}

function ProfilePage() {
  const { id } = useParams();
  const loggedInUser = useUser();
  const profileUser = getUserById(Number(id));

  if (!profileUser) return <p className={styles['no-user']}>Korisnik nije pronađen.</p>;
  if (!loggedInUser)
    return <p className={styles['no-user']}>Molimo prijavite se za pregled profila.</p>;

  const isOwner = loggedInUser.user.id === profileUser.id;

  console.log('Rendering ProfilePage for user ID:', id, 'Is owner:', isOwner);

  console.log('loggedInUser:', loggedInUser);
  console.log('profileUser:', profileUser);

  return (
    <div className={styles['profile-page']}>
      <ProfileScreen user={profileUser} canEdit={isOwner} />
      <ToastContainer />
    </div>
  );
}

export default ProfilePage;