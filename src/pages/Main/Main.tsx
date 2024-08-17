import { FC, useState } from 'react';
import clsx from 'clsx';
import { PairsList } from '@/components/PairsList/PairsList';
import useLocalStorage from '../../hooks/useLocalStorage';
import { PairForm } from '@/components/PairForm/PairForm';
import { UiButton } from '@/components/ui/Button/Button';
import { formatDate } from '@/utils/convertDate';
import { TPairs, TRatio } from '@/types/types';
import Footer from '@/components/Footer/Footer';
import { fetchCodes, fetchRatio } from '@/api/api';
import { mockFetchCodes, mockFetchRatio } from '@/api/apiMock';
import { ThemeSwitch } from '@/components/ui/ThemeSwitch/ThemeSwitch';
import { isDarkMode } from '@/utils/isDarkMode';

import styles from './Main.module.css';

type Props = {
  switchTheme: () => void;
  mode: 'light' | 'dark';
};

const realApi = {
  fetchRatio: fetchRatio,
  fetchCodes: fetchCodes,
};
const mockApi = {
  fetchCodes: mockFetchCodes,
  fetchRatio: mockFetchRatio,
};

const api = import.meta.env.DEV ? mockApi : realApi;

export const Main: FC<Props> = ({ switchTheme, mode }) => {
  const [pairs, setPairs] = useLocalStorage<TPairs>('pairs', []);
  const [ratios, setRatios] = useLocalStorage<{ [key: string]: TRatio['rates'] }>('ratios', {});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateTime, setUpdateTime] = useLocalStorage<string>('updateTime', '');
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
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
        const data = await api.fetchRatio(base);
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
    <div className={clsx(styles.container, isDarkMode(mode) && styles.containerDark)}>
      <ThemeSwitch switchTheme={switchTheme} mode={mode} />
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
