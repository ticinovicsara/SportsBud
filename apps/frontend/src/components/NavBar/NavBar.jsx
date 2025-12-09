import styles from './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCirclePlus, faUser } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <nav className={styles['navbar-container']}>
      <ul className={styles['navbar-items']}>
        <li className={styles['navbar-item']}>
          <FontAwesomeIcon icon={faHouse} className={styles['navbar-icon']} />
          <p>Home</p>
        </li>
        <li className={styles['navbar-item']}>
          <FontAwesomeIcon icon={faCirclePlus} className={styles['navbar-icon']} />
          <p>Create</p>
        </li>
        <li className={styles['navbar-item']}>
          <FontAwesomeIcon icon={faUser} className={styles['navbar-icon']} />
          <p>Profile</p>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
