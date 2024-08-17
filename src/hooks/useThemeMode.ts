import { useState, useLayoutEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useThemeMode = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useLayoutEffect(() => {
    const savedMode = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedMode) {
      setMode(savedMode);
    } else if (prefersDarkMode) {
      setMode('dark');
    }
  }, [prefersDarkMode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  return { mode, toggleTheme };
};
