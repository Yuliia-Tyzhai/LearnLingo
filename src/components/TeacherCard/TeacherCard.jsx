import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favorites/slice';
import { selectFavorites } from '../../redux/favorites/selectors';
import { nanoid } from 'nanoid';

import styles from './TeacherCard.module.css';
import heartIcon from '../../assets/heart.svg';
import heartFilledIcon from '../../assets/heart-hover.svg';

const TeacherCard = ({ teacher }) => {
  const dispatch = useDispatch();
  const favoriteTeachers = useSelector(selectFavorites);

  const [teacherId] = useState(() => teacher.id || nanoid());

  const isFavorite = favoriteTeachers.includes(teacherId);

  const handleFavoriteClick = () => {
    if (!teacherId) {
      console.error('Teacher ID is undefined. Cannot toggle favorite status.');
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(teacherId));
    } else {
      dispatch(addToFavorites(teacherId));
    }
  };

  const [showFullInfo, setShowFullInfo] = useState(false);

  const toggleFullInfo = () => {
    setShowFullInfo(prev => !prev);
  };

  useEffect(() => {
    console.log('Generated Teacher ID:', teacherId);
  }, [teacherId]);

  return (
    <div className={styles.teacherCard}>
      <div className={styles.avatarContainer}>
        <img
          src={teacher.avatar_url || '/placeholder.jpg'}
          alt={`${teacher.name || 'Teacher'} ${teacher.surname || ''}`}
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
              </span>
              <button
                onClick={handleFavoriteClick}
                className={styles.favoriteBtn}
              >
                <img
                  src={isFavorite ? heartFilledIcon : heartIcon}
                  alt="Heart Icon"
                  className={styles.icon}
                />
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
              <>
                <div className={styles.readMoreBtnContainer}>
                  <button
                    onClick={toggleFullInfo}
                    className={styles.readMoreBtn}
                  >
                    Read More
                  </button>
                </div>
                <ul className={styles.levelsList}>
                  {teacher.levels.map((level, index) => (
                    <li key={index}>#{level}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {showFullInfo && (
          <>
            <p>{teacher.experience || 'No experience provided.'}</p>
            <p>Reviews:</p>
            <ul>
              {teacher.reviews && teacher.reviews.length > 0 ? (
                teacher.reviews.map((review, index) => (
                  <li key={index}>
                    <strong>{review.reviewer_name}</strong>: {review.comment} (
                    {review.reviewer_rating}/5)
                  </li>
                ))
              ) : (
                <li>No reviews available.</li>
              )}
            </ul>

            <ul className={styles.levelsList}>
              {teacher.levels.map((level, index) => (
                <li key={index}>#{level}</li>
              ))}
            </ul>
            <button className={styles.bookBtn}>Book trial lesson</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherCard;
