import React, { useState } from 'react';
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
              <p>Lessons online</p>
              <p>Lessons done: {teacher.lessons_done}</p>
              <p>Rating: {teacher.rating}</p>
              <p>Price / 1 hour: ${teacher.price_per_hour}</p>
            </div>
            <div>
              <button onClick={onFavoriteToggle}>❤️</button>
            </div>
          </div>
          <div className={styles.info}>
            <p className={styles.teacherLanguages}>
              <span>Speaks:</span> {teacher.languages.join(', ')}
            </p>
            <p className={styles.teacherLanguages}>
              <span>Lesson Info:</span> {teacher.lesson_info}
            </p>
            <p className={styles.teacherLanguages}>
              <span>Conditions:</span> {teacher.conditions.join(' ')}
            </p>
          </div>
        </div>

        {showFullInfo ? (
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
            <button onClick={toggleFullInfo}>Hide</button>
            <button>Book trial lesson</button>
          </>
        ) : (
          <>
            <button onClick={toggleFullInfo}>Read More</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherCard;
