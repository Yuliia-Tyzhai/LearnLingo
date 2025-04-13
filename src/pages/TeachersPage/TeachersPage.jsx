import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ref, get } from 'firebase/database';
import { database } from '/firebase.config.js';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import Filters from '../../components/Filters/Filters';
import Loader from '../../components/Loader/Loader';
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from '../../redux/favorites/slice';
import { selectFavorites } from '../../redux/favorites/selectors';
import {
  selectLanguage,
  selectLevel,
  selectPriceRange,
} from '../../redux/filters/selectors';
import styles from './TeachersPage.module.css';

const TeachersPage = () => {
  const dispatch = useDispatch();
  const favoriteTeacherIds = useSelector(selectFavorites);

  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const languageFilter = useSelector(selectLanguage);
  const levelFilter = useSelector(selectLevel);
  const priceRangeFilter = useSelector(selectPriceRange);

  useEffect(() => {
    const favoritesFromStorage =
      JSON.parse(localStorage.getItem('favorites')) || [];
    dispatch(setFavorites(favoritesFromStorage));
  }, [dispatch]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const rootRef = ref(database, '/');
        const snapshot = await get(rootRef);
        if (snapshot.exists()) {
          const fetchedTeachers = Object.values(snapshot.val()).map(
            (teacher, index) => ({
              ...teacher,
              id: teacher.id || `teacher-${index}`,
            })
          );
          setTeachers(fetchedTeachers);
        } else {
          console.error('No teacher data found.');
        }
      } catch (err) {
        setError('Error loading data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = teachers;

      if (languageFilter && languageFilter !== 'All') {
        filtered = filtered.filter(teacher =>
          teacher.languages?.includes(languageFilter)
        );
      }

      if (levelFilter && levelFilter !== 'All') {
        filtered = filtered.filter(teacher =>
          teacher.levels?.includes(levelFilter)
        );
      }

      filtered = filtered.filter(
        teacher =>
          priceRangeFilter.includes('All') ||
          (teacher.price_per_hour >= priceRangeFilter[0] &&
            teacher.price_per_hour <= priceRangeFilter[1])
      );

      setFilteredTeachers(filtered);
    };

    applyFilters();
  }, [teachers, languageFilter, levelFilter, priceRangeFilter]);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  const handleFavoriteClick = (teacherId, isFavorite) => {
    if (isFavorite) {
      dispatch(removeFromFavorites(teacherId));
    } else {
      dispatch(addToFavorites(teacherId));
    }
  };

  return (
    <div className={styles.teachersPageContainer}>
      <Filters />

      {loading && <Loader />}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && filteredTeachers.length === 0 && (
        <p>No teachers matching your filters.</p>
      )}

      <div className={styles.teachersGrid}>
        {filteredTeachers.slice(0, visibleCount).map(teacher => {
          const isFavorite = favoriteTeacherIds.includes(teacher.id);

          return (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              isFavorite={isFavorite}
              onFavoriteToggle={() =>
                handleFavoriteClick(teacher.id, isFavorite)
              }
            />
          );
        })}
      </div>

      {visibleCount < filteredTeachers.length && (
        <div className={styles.loadMoreContainer}>
          <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default TeachersPage;
