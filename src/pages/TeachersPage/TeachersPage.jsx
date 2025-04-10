import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '/firebase.config.js';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import styles from './TeachersPage.module.css';

const TeachersPage = () => {
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

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  return (
    <div className={styles.teachersPageContainer}>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && teachers.length === 0 && <p>No teachers available.</p>}
      <div className="teachers-grid">
        {teachers.slice(0, visibleCount).map((teacher, index) => (
          <TeacherCard key={teacher.id || index} teacher={teacher} />
        ))}
      </div>
      {visibleCount < teachers.length && (
        <button onClick={handleLoadMore} className="load-more">
          Load More
        </button>
      )}
    </div>
  );
};

export default TeachersPage;
