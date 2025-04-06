import React from 'react';
import styles from './HomePage.module.css';
import homePageImg from '../../assets/home-page-img.png';

const HomePage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.firstContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.homePageTitle}>
            Unlock your potential with the best{' '}
            <span className={styles.titleSpan}>language</span> tutors
          </h1>
          <p className={styles.homePageText}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <button className={styles.homePageBtn}>Get started</button>
        </div>
        <div>
          <img src={homePageImg} alt="Language learning" />
        </div>
      </div>

      <div className={styles.listContainer}>
        <ul>
          <li>
            <h2 className={styles.listItemTitle}>32,000 +</h2>
            <p className={styles.listItemText}>Experienced tutors</p>
          </li>
          <li>
            <h2 className={styles.listItemTitle}>300,000 +</h2>
            <p className={styles.listItemText}>5-star tutor reviews</p>
          </li>
          <li>
            <h2 className={styles.listItemTitle}>120 +</h2>
            <p className={styles.listItemText}>Subjects taught</p>
          </li>
          <li>
            <h2 className={styles.listItemTitle}>200 +</h2>
            <p className={styles.listItemText}>Tutor nationalities</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
