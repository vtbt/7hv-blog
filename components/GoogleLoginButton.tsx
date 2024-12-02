import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

import { firebaseConfig } from '@/firebase/firebaseConfig';

import { GoogleIcon } from './GoogleIcon';

const firebase = initializeApp(firebaseConfig);

export const GoogleLoginButton: React.FC = () => {
  const auth = getAuth(firebase);
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Successfully logged in with Google:', user.displayName);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="py-2 px-4 rounded-md flex items-center space-x-2 cursor-pointer border border-gray-500 border-solid border-1"
      onClick={handleGoogleLogin}
    >
      <GoogleIcon /> <span>Log in with Google</span>
    </button>
  );
};
