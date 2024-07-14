import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TRatio } from '@/types/types';
import useLocalStorage from '../hooks/useLocalStorage';
import { fetchRatio } from './api';



export const useRatio = (base: string) => {
  const [storedRatios, setStoredRatios] = useLocalStorage<{ [key: string]: TRatio }>('ratios', {});

  const query = useQuery({
    queryKey: ['ratio', base],
    queryFn: () => fetchRatio(base),
    initialData: storedRatios,
    enabled: !!base
  });

  useEffect(() => {
    if (query.isSuccess && query.data && query.data.rates) {
      setStoredRatios((prev) => {
        if (JSON.stringify(prev[base]) !== JSON.stringify(query.data.rates)) {
          return { ...prev, [base]: query.data.rates };
        }
        return prev;
      });
    }
  }, [query.isSuccess, query.data, base, setStoredRatios]);

  return query;
};