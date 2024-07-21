import { useEffect, useState } from 'react';
import { TRatio } from '@/types/types';
import { fetchRatio } from './api';

export const useRatio = (base: string, shouldFetch: boolean = true) => {
  const [data, setData] = useState<TRatio['rates'] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!base || !shouldFetch) return;

    const loadRatios = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRatio(base);
        setData(data.rates);
        setError(null);
      } catch (err) {
        setError('Unable to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadRatios();
  }, [base, shouldFetch]);

  return { data, isLoading, error };
};