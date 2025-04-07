import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '/firebase.config.js';
import TeacherCard from '../../components/TeacherCard/TeacherCard';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const teachersRef = ref(database, '/');
        const snapshot = await get(teachersRef);
        if (snapshot.exists()) {
          const fetchedTeachers = Object.values(snapshot.val());
          setTeachers(fetchedTeachers);
        } else {
          console.log('No teachers found in the database.');
        }
      } catch (error) {
        setError('Помилка при отриманні даних з бази.');
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
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}{' '}
      {!loading && teachers.length === 0 && <p>No teachers.</p>}{' '}
      <div className="teachers-grid">
        {teachers.slice(0, visibleCount).map((teacher, index) => (
          <TeacherCard key={index} teacher={teacher} />
        ))}
      </div>
      {visibleCount < teachers.length && (
        <button onClick={handleLoadMore} className="load-more">
          Load more
        </button>
      )}
    </div>
  );
};

export default TeachersPage;
