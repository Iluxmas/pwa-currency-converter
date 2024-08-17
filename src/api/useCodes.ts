import { fetchCodes } from './api';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { TCodeList } from '@/types/types';
import { mockFetchCodes } from './apiMock';


export const useCodes = () => {
  const [storedCodes, setStoredCodes] = useLocalStorage('codesList', null);
  const [codes, setCodes] = useState<TCodeList | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCodes = async () => {
      setIsLoading(true);
      try {
        const data = await (import.meta.env.DEV ? mockFetchCodes : fetchCodes)();
        setCodes(data.symbols);
        setStoredCodes(data.symbols);
        setError(null);
      } catch (err) {
        setError('Unable to load currency codes');
      } finally {
        setIsLoading(false);
      }
    };

    if (storedCodes) {
      setCodes(storedCodes);
    } else {
      loadCodes();
    }
  }, [storedCodes, setStoredCodes]);

  return { codes, isLoading, error };
};