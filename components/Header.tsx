import Link from 'next/link';

import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

import LanguageSelect from './LanguageSelect';
import Navbar from './Navbar';

export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang);
  return (
    <header className="py-6">
      <nav className="container flex items-center justify-between">
        <Link href={`/${lang}`} className="text-lg font-bold">
          7hv
        </Link>
        <Navbar dictionary={navigation} />
        <LanguageSelect />
      </nav>
    </header>
  );
}
