import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCLq8KBV8mh9hGUtrpal66vjdI8Ke8XEgk',
    authDomain: 'fb-react1-90f1e.firebaseapp.com',
    projectId: 'fb-react1-90f1e',
    storageBucket: "fb-react1-90f1e.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export default app;