import { FC, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { PairsList } from '@/components/PairsList/PairsList';
import { PairForm } from '@/components/PairForm/PairForm';
import { TPairs, TRatio } from '@/types/types';
import { fetchRatio } from '@/api/api';
import { formatDate } from '@/utils/convertDate';

import styles from './App.module.css';
import Footer from '../Footer/Footer';
import { UiButton } from '../ui/Button/Button';

export const App: FC = () => {
  const [pairs, setPairs] = useLocalStorage<TPairs>('pairs', []);
  const [ratios, setRatios] = useLocalStorage<{ [key: string]: TRatio['rates'] }>('ratios', {});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateTime, setUpdateTime] = useLocalStorage<string>('updateTime', '');
  const [isOpen, setIsOpen] = useState(false);
  // TODO: SHOW LAST UPDATED DATE
  // TODO: RESET SELECT VALUE AFTER ADD

  const handleAddPair = (sourceCurrency: string, targetCurrency: string): void => {
    if (pairs.some((pair) => pair[0] === sourceCurrency && pair[1] === targetCurrency)) return;

    const newPair = [sourceCurrency, targetCurrency] as const;
    const newPairsData = (pairs ? [...pairs, newPair] : [newPair]) as TPairs;

    if (!ratios[sourceCurrency]) {
      handleUpdate([sourceCurrency]);
    }

    if (pairs.length === 0) {
      setUpdateTime(new Date().toISOString());
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

    setUpdateTime(new Date().toISOString());
    setIsUpdating(false);
  };

  const handleToggleDrawerVisibility = () => {
    setIsOpen((prev) => !prev);
  };

  if (!ratios) return null;

  const displayedDate = updateTime ? formatDate(updateTime) : '';

  return (
    <div className={styles.container}>
      <PairsList pairsData={pairs} rates={ratios} onDelete={handleDeletePair} />
      <div className={styles.buttonGroup}>
        <UiButton onClick={handleToggleDrawerVisibility} variant='contained' fullWidth text='+' sx={{ mt: 'auto' }} />
        {pairs.length > 0 && (
          <UiButton onClick={() => handleUpdate()} isLoading={isUpdating} text='Update rates' fullWidth />
        )}
      </div>
      <PairForm onAdd={handleAddPair} isOpen={isOpen} onClose={handleToggleDrawerVisibility} />
      <Footer updateTime={updateTime} displayedDate={displayedDate} />
    </div>
  );
};