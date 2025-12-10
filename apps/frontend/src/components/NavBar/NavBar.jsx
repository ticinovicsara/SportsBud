import styles from './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCirclePlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={styles['navbar-container']}>
      <ul className={styles['navbar-items']}>
        <li className={`${styles['navbar-item']} ${isActive('/') ? styles.active : ''}`}>
          <NavLink to="/" end>
            <FontAwesomeIcon icon={faHouse} className={styles['navbar-icon']} />
            <p>Home</p>
          </NavLink>
        </li>
        <li
          className={`${styles['navbar-item']} ${isActive('/create-event') ? styles.active : ''}`}
        >
          <NavLink to="/create-event" end>
            <FontAwesomeIcon icon={faCirclePlus} className={styles['navbar-icon']} />
            <p>Create</p>
          </NavLink>
        </li>
        <li className={`${styles['navbar-item']} ${isActive('/profile') ? styles.active : ''}`}>
          <NavLink to="/profile" end>
            <FontAwesomeIcon icon={faUser} className={styles['navbar-icon']} />
            <p>Profile</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
