import styles from './homePage.module.css';

function HomePage() {
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
    </div>
  );
}

export default HomePage;
