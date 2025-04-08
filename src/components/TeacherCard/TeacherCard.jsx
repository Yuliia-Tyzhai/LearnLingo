import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import heartIcon from '../../assets/heart.svg';
import styles from './TeacherCard.module.css';

const TeacherCard = ({ teacher, onFavoriteToggle }) => {
  const [showFullInfo, setShowFullInfo] = useState(false);

  const toggleFullInfo = () => {
    setShowFullInfo(prev => !prev);
  };

  return (
    <div className={styles.teacherCard}>
      <div className={styles.avatarContainer}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className={styles.teacherImg}
        />
      </div>

      <div className={styles.cardInfoContainer}>
        <div className={styles.firstContainer}>
          <div className={styles.nameContainer}>
            <div className={styles.teacherNameContainer}>
              <p className={styles.languagesText}>Languages</p>
              <h2 className={styles.teacherName}>
                {teacher.name} {teacher.surname}
              </h2>
            </div>

            <div className={styles.lessonsContainer}>
              <span>Lessons online</span>
              <span>Lessons done: {teacher.lessons_done}</span>
              <span>Rating: {teacher.rating}</span>
              <span className={styles.priceText}>
                Price / 1 hour:{' '}
                <span className={styles.price}>{teacher.price_per_hour}$</span>
              </span>{' '}
              <button onClick={onFavoriteToggle}>
                <ReactSVG src={heartIcon} className={styles.heartIcon} />
              </button>
            </div>
          </div>
          <div className={styles.info}>
            <p className={styles.teacherLanguages}>
              <span>Speaks:</span>{' '}
              <span className={styles.speaksSpan}>
                {teacher.languages.join(', ')}
              </span>
            </p>
            <p className={styles.teacherLanguages}>
              <span>Lesson Info:</span>{' '}
              <span className={styles.lessonInfoSpan}>
                {teacher.lesson_info}
              </span>
            </p>
            <p className={styles.teacherLanguages}>
              <span>Conditions:</span>{' '}
              <span className={styles.conditionsSpan}>
                {teacher.conditions.join(' ')}
              </span>
            </p>

            {!showFullInfo && (
              <div className={styles.readMoreBtnContainer}>
                <button onClick={toggleFullInfo} className={styles.readMoreBtn}>
                  Read More
                </button>
              </div>
            )}
          </div>
        </div>

        {showFullInfo && (
          <>
            <p>Levels: {teacher.levels.map(level => `#${level}`).join(' ')}</p>
            <p>{teacher.experience}</p>
            <p>Reviews:</p>
            <ul>
              {teacher.reviews.map((review, index) => (
                <li key={index}>
                  <strong>{review.reviewer_name}</strong>: {review.comment} (
                  {review.reviewer_rating}/5)
                </li>
              ))}
            </ul>

            <button>Book trial lesson</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherCard;
