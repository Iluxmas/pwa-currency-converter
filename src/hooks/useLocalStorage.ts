import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const getSavedValue = (): T => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      try {
        return JSON.parse(savedValue);
      } catch (e) {
        console.error("Parsing error on getting data from localStorage", e);
      }
    }
    return initialValue;
  };

  const [storedValue, setStoredValue] = useState<T>(getSavedValue);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      console.error("Error setting value in localStorage", e);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
