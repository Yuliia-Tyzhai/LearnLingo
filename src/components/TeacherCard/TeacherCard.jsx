import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favorites/slice';
import { selectFavorites } from '../../redux/favorites/selectors';
import { selectUser } from '../../redux/auth/selectors';
import { nanoid } from 'nanoid';

import styles from './TeacherCard.module.css';
import heartIcon from '../../assets/heart.svg';
import heartFilledIcon from '../../assets/heart-hover.svg';
import ModalUnauthorized from '../ModalUnauthorized/ModalUnauthorized';

const TeacherCard = ({ teacher }) => {
  const dispatch = useDispatch();
  const favoriteTeachers = useSelector(selectFavorites);
  const user = useSelector(selectUser);
  const isAuthenticated = Boolean(user);

  const [teacherId] = useState(() => teacher.id || nanoid());
  const isFavorite = favoriteTeachers.includes(teacherId);

  const [showModal, setShowModal] = useState(false);
  const [showFullInfo, setShowFullInfo] = useState(false);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }
    if (isFavorite) {
      dispatch(removeFromFavorites(teacherId));
    } else {
      dispatch(addToFavorites(teacherId));
    }
  };

  const closeModal = () => setShowModal(false);
  const toggleFullInfo = () => setShowFullInfo(prev => !prev);

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
            <div className={styles.lessonsContainer}>
              <p className={styles.languagesText}>Languages</p>
              <span>Lessons online</span>
              <span>Lessons done: {teacher.lessons_done}</span>
              <span>Rating: {teacher.rating}</span>
              <span className={styles.priceText}>
                Price / 1 hour:
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
            <div className={styles.teacherNameContainer}>
              <h2 className={styles.teacherName}>
                {teacher.name} {teacher.surname}
              </h2>
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

        {showModal && <ModalUnauthorized onClose={closeModal} />}
      </div>
    </div>
  );
};

export default TeacherCard;
