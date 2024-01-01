'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { GoogleLoginButton } from './GoogleLoginButton';
import { useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/firebaseConfig';
import { GoogleLogoutButton } from './GoogleLogoutButton';
const firebase = initializeApp(firebaseConfig);

const pages = [
  { id: 'projects', pathname: '/projects', title: 'Projects' },
  { id: 'about', pathname: '/about', title: 'About' },
];

export function Navbar() {
  const pathname = usePathname();
  const auth = getAuth(firebase);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Subscribe to changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the user state based on the authentication state
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <nav className="flex space-x-3">
      {pathname === '/manage' ? (
        user ? (
          <div className="flex items-center space-x-4">
            <p>Welcome, {user.displayName}!</p>
            <GoogleLogoutButton />
          </div>
        ) : (
          <GoogleLoginButton />
        )
      ) : (
        pages.map((page) => (
          <Link
            key={page.id}
            href={page.pathname}
            className={`hover:underline ${
              pathname === page.pathname ? 'underline font-bold' : ''
            }`}
          >
            {page.title}
          </Link>
        ))
      )}
    </nav>
  );
}
