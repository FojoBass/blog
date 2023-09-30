import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { browserSessionPersistence, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC3WwOCh8AKiByViUuiQ337uvxRQwZLdqA',
  authDomain: 'devblog-34bb4.firebaseapp.com',
  projectId: 'devblog-34bb4',
  storageBucket: 'devblog-34bb4.appspot.com',
  messagingSenderId: '928688214153',
  appId: '1:928688214153:web:d654613abdad84a1b2f658',
};

const app = initializeApp(firebaseConfig);

// todo Add line for login persistence

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
auth.setPersistence(browserSessionPersistence);
