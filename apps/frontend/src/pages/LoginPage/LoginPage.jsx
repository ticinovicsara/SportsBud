import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import { InputField, SubmitButton } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { USERS } from '../../data';
import { toast } from 'react-toastify';
import loginImage from '../../assets';
import styles from './loginPage.module.css';

function LoginPage() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { emailOrUsername, password } = formData;

    if (!emailOrUsername || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const user = USERS.find(
      (u) =>
        (u.username === emailOrUsername || u.email === emailOrUsername) && u.password === password
    );

    if (user) {
      login(user);
      toast.success(`Welcome back, ${user.firstName}!`);
      navigate('/');
    } else {
      toast.error('Invalid credentials, please try again!');
    }
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['login-header']}>
        <FontAwesomeIcon icon={faPersonRunning} className={styles['login-header-icon']} />
        <h1>SportsBud</h1>
      </div>

      <div className={styles['login-image-container']}>
        <img src={loginImage} alt="Login" className={styles['login-image']} />
      </div>
      <h1 className={styles['login-title']}>Welcome to SportsBud</h1>
      <h4 className={styles['login-subtitle']}>Find your perfect workout partner today!</h4>

      <form className={styles['login-form']} onSubmit={handleLogin}>
        <InputField
          label="Email or Username"
          type="text"
          placeholder="Enter your email or username"
          name="emailOrUsername"
          value={formData.emailOrUsername}
          onChange={handleChange}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className={styles['login-buttons-container']}>
          <SubmitButton type="submit" variant="primary">
            Login
          </SubmitButton>

          <SubmitButton variant="secondary" onClick={() => navigate('/register')}>
            Sign Up
          </SubmitButton>
        </div>
      </form>

      <p className={styles['login-terms']}>
        By continuing, you agree to SportsBud's Terms of Service and privacy Policy
      </p>
    </div>
  );
}

export default LoginPage;
