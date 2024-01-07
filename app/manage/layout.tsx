import Header from '@/components/Header';
import '../globals.css';
import { Language } from '@/i18n.config';

export const metadata = {
  title: '7hv Blog - Manage Content',
  description: 'Manage My first project',
};

export default async function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="max-w-3xl mx-auto py-10">
        <Header lang={'en'} />
        <main className="py-20">{children}</main>
      </body>
    </html>
  );
}
