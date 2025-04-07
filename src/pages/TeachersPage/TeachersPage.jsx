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
        const rootRef = ref(database, '/');
        const snapshot = await get(rootRef);
        if (snapshot.exists()) {
          const fetchedTeachers = Object.values(snapshot.val());
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

  const handleFavoriteToggle = teacherId => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(teacherId)) {
      favorites = favorites.filter(id => id !== teacherId);
    } else {
      favorites.push(teacherId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Favorites updated:', favorites);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && teachers.length === 0 && <p>No teachers available.</p>}
      <div className="teachers-grid">
        {teachers.slice(0, visibleCount).map((teacher, index) => (
          <TeacherCard
            key={index}
            teacher={teacher}
            onFavoriteToggle={() => handleFavoriteToggle(teacher.id)}
          />
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
