import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ref, get } from 'firebase/database';
import { database } from '../../../firebase.config';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import styles from './TeachersPage.module.css';
import {
  selectLanguage,
  selectLevel,
  selectPriceRange,
} from '../../redux/filters/selectors';
import Filters from '../../components/Filters/Filters';
import Loader from '../../components/Loader/Loader';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const languageFilter = useSelector(selectLanguage);
  const levelFilter = useSelector(selectLevel);
  const priceRangeFilter = useSelector(selectPriceRange);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const rootRef = ref(database, '/');
        const snapshot = await get(rootRef);
        if (snapshot.exists()) {
          const fetchedTeachers = Object.values(snapshot.val()).map(
            (teacher, index) => {
              const id = teacher.id || `teacher-${index}-${Date.now()}`;
              return { ...teacher, id };
            }
          );
          setTeachers(fetchedTeachers);
        } else {
          console.log('No teacher data found.');
        }
      } catch (error) {
        setError('Error loading data.');
        console.error('Error fetching teachers:', error);
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
        filtered = filtered.filter(
          teacher =>
            teacher.languages && teacher.languages.includes(languageFilter)
        );
      }

      if (levelFilter && levelFilter !== 'All') {
        filtered = filtered.filter(
          teacher => teacher.levels && teacher.levels.includes(levelFilter)
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

  return (
    <div className={styles.teachersPageContainer}>
      <Filters />
      {loading && <Loader />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && filteredTeachers.length === 0 && (
        <p>No teachers matching your filters.</p>
      )}
      <div className={styles.teachersGrid}>
        {filteredTeachers.slice(0, visibleCount).map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
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
