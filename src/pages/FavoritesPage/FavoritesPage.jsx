import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { useSelector } from 'react-redux';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import { database } from '../../../firebase.config';
import { selectFavorites } from '../../redux/favorites/selectors';
import styles from '../TeachersPage/TeachersPage.module.css';

const FavoritesPage = () => {
  const favoriteTeacherIds = useSelector(selectFavorites);
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
          const fetchedTeachers = Object.values(snapshot.val()).map(
            (teacher, index) =>
              teacher.id ? teacher : { ...teacher, id: index.toString() }
          );
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

  const favoriteTeachers = teachers.filter(teacher =>
    favoriteTeacherIds.includes(teacher.id)
  );

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  return (
    <div className={styles.teachersPageContainer}>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && favoriteTeachers.length === 0 && <p>No teachers</p>}
      <div className={styles.teachersGrid}>
        {favoriteTeachers.slice(0, visibleCount).map((teacher, index) => (
          <TeacherCard key={teacher.id || index} teacher={teacher} />
        ))}
      </div>
      {visibleCount < favoriteTeachers.length && (
        <div className={styles.loadMoreContainer}>
          <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
