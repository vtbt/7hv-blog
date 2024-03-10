'use client';

import { useEffect, useState } from 'react';

export default function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState<string>(
    localStorage.getItem('theme') || ''
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setSelectedTheme(storedTheme || 'system');
    toggleTheme(storedTheme || 'system');
  }, []);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;
    setSelectedTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  };

  const toggleTheme = (theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDarkMode = mediaQuery.matches;

    // If system preference is dark, and no theme selected yet, set it to dark
    if (selectedTheme === 'system' && prefersDarkMode) {
      toggleTheme('dark');
    } else {
      toggleTheme(selectedTheme);
    }

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (selectedTheme === 'system') {
        const newTheme = e.matches ? 'dark' : 'light';
        toggleTheme(newTheme);
      }
    };

    // Attach event listener for system theme change
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Clean up event listener on component unmount
    return () =>
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [selectedTheme]);

  return (
    <select value={selectedTheme} onChange={handleThemeChange}>
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  );
}
