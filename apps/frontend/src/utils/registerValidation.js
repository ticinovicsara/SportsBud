import { USERS } from '../data';

export const validateRegisterForm = (formData) => {
  const { firstName, lastName, username, email, password, gender, birthYear, sports } = formData;

  if (!firstName || !lastName || !username || !email || !password || !gender || !birthYear) {
    return { valid: false, message: 'Please fill in all required fields' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Please enter a valid email' };
  }

  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long' };
  }

  const existingUser = USERS.find((u) => u.username === username || u.email === email);
  if (existingUser) {
    return { valid: false, message: 'Username or email already taken' };
  }

  for (let i = 0; i < sports.length; i++) {
    const s = sports[i];
    if (s.sportId && !s.level) {
      return {
        valid: false,
        message: `Please select a level for all selected sports (Sport #${i + 1})`,
      };
    }
    if (!s.sportId && s.level) {
      return {
        valid: false,
        message: `Please select a sport for all specified levels (Sport #${i + 1})`,
      };
    }
  }

  return { valid: true };
};
