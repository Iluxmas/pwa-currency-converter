import { FC, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { PairsList } from '@/components/PairsList/PairsList';
import { PairForm } from '@/components/PairForm/PairForm';
import { TPairs, TRatio } from '@/types/types';
import { fetchRatio } from '@/api/api';

import styles from './App.module.css';

export const App: FC = () => {
  const [pairs, setPairs] = useLocalStorage<TPairs>('pairs', []);
  const [ratios, setRatios] = useLocalStorage<{ [key: string]: TRatio['rates'] }>('ratios', {});
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAddPair = (sourceCurrency: string, targetCurrency: string): void => {
    if (pairs.some((pair) => pair[0] === sourceCurrency && pair[1] === targetCurrency)) return;

    const newPair = [sourceCurrency, targetCurrency] as const;
    const newPairsData = (pairs ? [...pairs, newPair] : [newPair]) as TPairs;

    if (!ratios[sourceCurrency]) {
      handleUpdate([sourceCurrency]);
    }

    setPairs(newPairsData);
  };

  const handleDeletePair = (sourceCurrency: string, targetCurrency: string): void => {
    const newPairs = pairs.filter((item) => !(item[0] === sourceCurrency && item[1] === targetCurrency));
    setPairs(newPairs);
  };

  const handleUpdate = async (bases?: string[]) => {
    const uniqueBases = bases || [...new Set(pairs.map((pair) => pair[0]))];
    setIsUpdating(true);

    const fetchedRatios = await Promise.all(
      uniqueBases.map(async (base) => {
        const data = await fetchRatio(base);
        return { base, rates: data.rates };
      })
    );

    setRatios((prev) => {
      const updatedRatios = { ...prev };
      fetchedRatios.forEach(({ base, rates }) => {
        updatedRatios[base] = rates;
      });
      return updatedRatios;
    });

    setIsUpdating(false);
  };

  if (!ratios) return null;

  return (
    <div className={styles.container}>
      <PairsList
        pairsData={pairs}
        rates={ratios}
        isLoading={isUpdating}
        onDelete={handleDeletePair}
        onUpdate={() => handleUpdate()}
      />
      <PairForm onAdd={handleAddPair} />
    </div>
  );
};
