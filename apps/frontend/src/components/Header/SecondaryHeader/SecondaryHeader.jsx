import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import styles from './secondaryHeader.module.css';

const SecondaryHeader = () => {
  return (
    <div className={styles['secondary-header']}>
      <FontAwesomeIcon icon={faPersonRunning} className={styles['secondary-header-icon']} />
      <h1>SportsBud</h1>
    </div>
  );
};

export default SecondaryHeader;
