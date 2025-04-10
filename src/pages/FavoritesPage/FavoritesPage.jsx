import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../../../firebase.config';

import TeacherCard from '../../components/TeacherCard/TeacherCard';

import styles from '../TeachersPage/TeachersPage.module.css';

const FavoritesPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const rootRef = ref(database, '/');
        const snapshot = await get(rootRef);
        if (snapshot.exists()) {
          const fetchedTeachers = Object.values(snapshot.val());
          setTeachers(fetchedTeachers);
        } else {
          console.log('Дані про викладачів відсутні.');
        }
      } catch (err) {
        setError('Помилка завантаження даних.');
        console.error('Помилка отримання викладачів:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const favoritesRaw = localStorage.getItem('favorites');
  const favoriteTeacherIds = favoritesRaw ? JSON.parse(favoritesRaw) : [];

  const favoriteTeachers = teachers.filter(teacher =>
    favoriteTeacherIds.includes(teacher.id)
  );

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  return (
    <div className={styles.teachersPageContainer}>
      <h1>Мої обрані викладачі</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && favoriteTeachers.length === 0 && (
        <p>Ви ще не додали викладачів до обраних.</p>
      )}
      <div className={styles['teachers-grid']}>
        {favoriteTeachers.slice(0, visibleCount).map((teacher, index) => (
          <TeacherCard key={teacher.id || index} teacher={teacher} />
        ))}
      </div>
      {visibleCount < favoriteTeachers.length && (
        <button onClick={handleLoadMore} className={styles['load-more']}>
          Load More
        </button>
      )}
    </div>
  );
};

export default FavoritesPage;
