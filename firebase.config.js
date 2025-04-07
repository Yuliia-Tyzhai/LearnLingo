// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAThqJTZGHgAzl51GvLVFqLjXT1xMQm9pE',
  authDomain: 'teachers-a5542.firebaseapp.com',
  databaseURL: 'https://teachers-a5542-default-rtdb.firebaseio.com',
  projectId: 'teachers-a5542',
  storageBucket: 'teachers-a5542.firebasestorage.app',
  messagingSenderId: '330202288298',
  appId: '1:330202288298:web:21acd8584b26e28a0900d3',
  measurementId: 'G-K42775TSZ2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
