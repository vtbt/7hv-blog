'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import { Language, i18n } from '@/i18n.config';

export default function LanguageSelect() {
  const pathName = usePathname();
  const currentLocale = pathName.split('/')[1];

  const router = useRouter();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const [selectedLanguage, setSelectedLanguage] = useState(currentLocale);

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedLanguage(selectedValue);
    router.push(redirectedPathName(selectedValue));
  };

  if (pathName.includes('/manage')) return;

  return (
    <div>
      <select
        id="languageSelect"
        name="language"
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="block w-full p-2 focus:outline-none"
      >
        {i18n.locales.map((locale) => (
          <option key={locale} value={locale}>
            {Language[locale]}
          </option>
        ))}
      </select>
    </div>
  );
}
