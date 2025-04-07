import React from 'react';

const TeacherCard = ({ teacher, onFavoriteToggle }) => {
  return (
    <div className="teacher-card">
      <img
        src={teacher.avatar_url}
        alt={`${teacher.name} ${teacher.surname}`}
      />
      <h2>{`${teacher.name} ${teacher.surname}`}</h2>
      <p>Languages: {teacher.languages.join(', ')}</p>
      <p>Levels: {teacher.levels.join(', ')}</p>
      <p>Price per hour: ${teacher.price_per_hour}</p>
      <button onClick={() => onFavoriteToggle(teacher.id)}>❤️</button>
      <button>Read More</button>
      <button>Book Trial Lesson</button>
    </div>
  );
};

export default TeacherCard;
