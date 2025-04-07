import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAThqJTZGHgAzl51GvLVFqLjXT1xMQm9pE',
  authDomain: 'teachers-a5542.firebaseapp.com',
  databaseURL: 'https://teachers-a5542-default-rtdb.firebaseio.com',
  projectId: 'teachers-a5542',
  storageBucket: 'teachers-a5542.appspot.com',
  messagingSenderId: '330202288298',
  appId: '1:330202288298:web:21acd8584b26e28a0900d3',
  measurementId: 'G-K42775TSZ2',
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, database, firestore, storage };
