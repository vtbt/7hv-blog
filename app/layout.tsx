import Link from 'next/link';

import './globals.css';
import { Navbar } from '@/components/Navbar';

export const metadata = {
  title: '7hv Blog',
  description: 'My first project',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="max-w-3xl mx-auto py-10">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-lg font-bold">
            7hv
          </Link>
          <div className="flex items-center gap-5 text-sm text-gray-600">
            <Navbar />
          </div>
        </header>
        <main className="py-20">{children}</main>
      </body>
    </html>
  );
}
