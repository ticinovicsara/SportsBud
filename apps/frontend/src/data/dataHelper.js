import { USERS } from '../data/users.js';
import { EVENTS } from '../data/events.js';
import { SPORTS } from '../data/sports.js';

export const getUserById = (id) => USERS.find((user) => user.id === id);

export const getEventById = (id) => EVENTS.find((event) => event.id === id);

export const getSportById = (id) => SPORTS.find((sport) => sport.id === id);

export const getUpcomingEvents = () =>
  EVENTS.filter((event) => event.status === 'upcoming').sort(
    (a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time)
  );

export const getTodaysEvents = () => {
  const today = new Date().toISOString().split('T')[0];
  return EVENTS.filter((event) => event.date === today && event.status === 'upcoming');
};

export const getUserEvents = (userId) =>
  EVENTS.filter((event) => event.participants.some((p) => p.userId === userId));

export const getUserFollowers = (userId) => {
  const user = getUserById(userId);
  return user ? user.followers.map((id) => getUserById(id)) : [];
};

export const getUserFollowing = (userId) => {
  const user = getUserById(userId);
  return user ? user.following.map((id) => getUserById(id)) : [];
};

export const getUserLevel = (points) => {
  return (
    LEVEL_THRESHOLDS.find(
      (threshold) => points >= threshold.minPoints && points <= threshold.maxPoints
    ) || LEVEL_THRESHOLDS[0]
  );
};

export const calculateUserTotalPoints = (user) => {
  return user.sports.reduce((total, sport) => total + sport.points, 0);
};

// ==================== USAGE EXAMPLE ====================
/*
// U bilo kojoj komponenti:
import { USERS, EVENTS } from '../data/users';
import { getUserById, getUpcomingEvents } from '../utils/dataHelpers';

// Dohvati nadolazeće evente
const upcoming = getUpcomingEvents();

// Dohvati user-a
const user = getUserById(1);


pripazite na importanje { getUserById, getUpcomingEvents }...da su iz odgovarajuće putanje
*/
