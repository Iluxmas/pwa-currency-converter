import { useQuery } from '@tanstack/react-query';
import { fetchCodes } from './api';
import useLocalStorage from '../hooks/useLocalStorage';


export const useCodes = () => {
  const [storedCodes, setStoredCodes] = useLocalStorage('codesList', null);

  const query = useQuery({ queryKey: ['codes'], queryFn: fetchCodes, initialData: { symbols: storedCodes }, enabled: !storedCodes });

  if (query.isSuccess) {
    if (query.data && query.data.symbols && query.data.symbols !== storedCodes) {

      setStoredCodes(query.data.symbols);
    }
  }

  return query;
};