import styles from './registerPage.module.css';
import { USERS } from '../../data';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { toast } from 'react-toastify';
import {
  DropdownField,
  InputField,
  SecondaryHeader,
  SportLevelSelector,
  SubmitButton,
} from '../../components';

function RegisterPage() {
  const navigate = useNavigate();
  const { formData, setFormData, handleChange } = useForm({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    gender: '',
    birthYear: '',
    location: '',
    sports: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, username, email, password, gender, birthYear } = formData;

    if (!firstName || !lastName || !username || !email || !password || !gender || !birthYear) {
      toast.error('Please fill in all required fields');
      return;
    }

    const existingUser = USERS.find((u) => u.username === username || u.email === email);
    if (existingUser) {
      toast.error('Username or email already taken');
      return;
    }

    const newUser = {
      ...formData,
      id: USERS.length + 1,
      createdAt: new Date().toISOString(),
      totalEventsAttended: 0,
      friends: 0,
    };
    USERS.push(newUser);

    toast.success(`Welcome to SportsBud, ${newUser.firstName}!`);
    navigate('/login');
  };

  return (
    <div className={styles['register-page']}>
      <SecondaryHeader />

      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={styles['login-form']}>
        <InputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <InputField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
        />
        <InputField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
        />
        <DropdownField
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          options={[
            { value: 'M', label: 'Male' },
            { value: 'F', label: 'Female' },
          ]}
        />

        <DropdownField
          label="Birth Year"
          name="birthYear"
          value={formData.birthYear}
          onChange={handleChange}
          options={[...Array(50)].map((_, i) => {
            const year = 2024 - i;
            return { value: year, label: year };
          })}
        />

        <InputField
          label="Location (optional)"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <SportLevelSelector
          sports={formData.sports}
          onChange={(updated) => setFormData({ ...formData, sports: updated })}
        />

        <SubmitButton type="submit" variant="primary">
          Register
        </SubmitButton>
      </form>
    </div>
  );
}

export default RegisterPage;
