import { useMemo } from 'react';
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@mui/material/styles';
import { Main } from '@/pages/Main/Main';
import { useThemeMode } from '@/hooks/useThemeMode';

export const App: React.FC = () => {
  const { mode, toggleTheme } = useThemeMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Main switchTheme={toggleTheme} mode={mode} />
    </ThemeProvider>
  );
};
