import styles from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Link to="/" className={styles['header-link']}>
        <FontAwesomeIcon icon={faPersonRunning} className={styles['header-icon']} />
        <h1>SportsBud</h1>
      </Link>
    </header>
  );
};

export default Header;
