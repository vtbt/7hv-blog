'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

import { firebaseConfig } from '@/firebase/firebaseConfig';
import { getDictionary } from '@/lib/dictionary';

import { GoogleLoginButton } from './GoogleLoginButton';
import { GoogleLogoutButton } from './GoogleLogoutButton';
const firebase = initializeApp(firebaseConfig);

type Page = {
  id: keyof Awaited<ReturnType<typeof getDictionary>>['navigation'];
  pathname: string;
};
const pages: Page[] = [
  { id: 'projects', pathname: '/projects' },
  { id: 'about', pathname: '/about' },
];

export default function Navbar({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['navigation'];
}) {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];

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
        <>
          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/${currentLocale}/${page.pathname}`}
              className={`hover:underline ${
                pathname.includes(page.pathname) ? 'underline font-bold' : ''
              }`}
            >
              {dictionary[page.id]}
            </Link>
          ))}
        </>
      )}
    </nav>
  );
}
