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
        {' '}
        <p className="teacher-languages">
          Speaks: {teacher.languages.join(', ')}
        </p>
        <h2>
          {teacher.name} {teacher.surname}
        </h2>
        <p>Lessons online</p>
        <p>Lessons done: {teacher.lessons_done}</p>
        <p>Rating: {teacher.rating}</p>
        <p>Price / 1 hour: ${teacher.price_per_hour}</p>
        <p>Lesson Info: {teacher.lesson_info}</p>
        <p>Conditions: {teacher.conditions.join(' ')}</p>
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
        <button onClick={onFavoriteToggle}>❤️</button>
      </div>
    </div>
  );
};

export default TeacherCard;
