import { firebaseConfig } from '@/firebase/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
const firebase = initializeApp(firebaseConfig);

export const GoogleLogoutButton = () => {
  const auth = getAuth(firebase);

  const handleGoogleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="py-2 px-4 rounded-md border border-gray-500 border-solid"
      onClick={handleGoogleLogout}
    >
      Log out
    </button>
  );
};
