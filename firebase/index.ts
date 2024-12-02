import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { getAuth } from 'firebase/auth';

const firebase = initializeApp(firebaseConfig);

const auth = getAuth(firebase);

export { auth };
