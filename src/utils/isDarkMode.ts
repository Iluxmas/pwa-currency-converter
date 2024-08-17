export const isDarkMode = (mode: 'light' | 'dark'): mode is 'dark' => {
  return mode === 'dark'
}