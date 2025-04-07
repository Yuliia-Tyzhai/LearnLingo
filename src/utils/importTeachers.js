import { getDatabase, ref, set } from 'firebase/database';
import teachersData from '../assets/teachers.json';

export const importTeachers = async () => {
  const database = getDatabase();

  try {
    teachersData.forEach((teacher, index) => {
      const teacherRef = ref(database, `teachers/teacher${index + 1}`);
      set(teacherRef, teacher)
        .then(() =>
          console.log(`Teacher ${teacher.name} imported successfully.`)
        )
        .catch(error =>
          console.error(`Error importing teacher ${teacher.name}:`, error)
        );
    });
  } catch (error) {
    console.error('Error during import:', error);
  }
};

importTeachers();
