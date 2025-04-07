import { getDatabase, ref, set } from 'firebase/database';
import teachersData from '../assets/teachers.json';

export const importTeachers = () => {
  const database = getDatabase();

  Object.keys(teachersData).forEach(teacherId => {
    const teacherRef = ref(database, `teachers/${teacherId}`);
    set(teacherRef, teachersData[teacherId])
      .then(() => {
        console.log(`Teacher ${teacherId} imported successfully`);
      })
      .catch(error => {
        console.error(`Error importing teacher ${teacherId}:`, error);
      });
  });
};
