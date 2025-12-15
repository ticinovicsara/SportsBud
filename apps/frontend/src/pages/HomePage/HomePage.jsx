import { Link } from 'react-router-dom';
import styles from './homePage.module.css';

function HomePage() {
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className={styles['home-page']}>
      <div className={styles['cards-container']}>
        <div className={styles['card']}>
          <p className={styles['time']}>2:00 PM</p>
          <h3 className={styles['title']}>Basketball Pickup Game</h3>
          <p className={styles['location']}>Central Park Courts</p>
          <p className={styles['joined']}>🧍 8/12 players joined</p>
        </div>

        <div className={styles['card']}>
          <p className={styles['time']}>5:30 PM</p>
          <h3 className={styles['title']}>Evening Yoga Session</h3>
          <p className={styles['location']}>Riverside Park</p>
          <p className={styles['joined']}>🧍 15/20 people joined</p>
        </div>
      </div>

      <div className={styles['upcoming-row']}>
        <h2 className={styles['upcoming-text']}>Upcoming Events</h2>
        <span className={styles['see-all']}>
          <Link to="/events" className={styles['see-all-link']}>
            See All
          </Link>
        </span>
      </div>

      <div className={styles['event-card']}>
        <div className={styles['event-header']}>
          <h3 className={styles['event-title']}>Soccer Tournament</h3>
          <span className={styles['spots-left']}>5 SPOTS LEFT</span>
        </div>

        <p className={styles['event-time']}>Tomorrow, 10:00 AM</p>

        <p className={styles['event-description']}>
          Join our monthly amateur soccer tournament at Meadow Fields. All skill levels welcome!
        </p>

        <div className={styles['event-footer']}>
          <div className={styles['host']}>
            <img src="https://i.pravatar.cc/40" alt="host" className={styles['avatar']} />
            <span>Mark Chen</span>
          </div>

          <button className={styles['join-button']}>Join</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
