import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDuwtOvSlEB2utZGD-IzcSwNTLnps3gBGo',
  authDomain: 'bareng-b9d88.firebaseapp.com',
  databaseURL: 'https://bareng-b9d88-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'bareng-b9d88',
  storageBucket: 'bareng-b9d88.firebasestorage.app',
  messagingSenderId: '405330435328',
  appId: '1:405330435328:web:5157ea94fc0657911fe7e5',
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
