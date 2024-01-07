import '../globals.css';
import { Locale, i18n } from '@/i18n.config';
import Header from '@/components/Header';

export const metadata = {
  title: '7hv Blog',
  description: 'My first project',
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body className="max-w-3xl mx-auto py-10">
        <Header lang={params.lang} />
        <main className="py-20">{children}</main>
      </body>
    </html>
  );
}
