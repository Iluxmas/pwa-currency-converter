import { FC, useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { PairsList } from '@/components/PairsList/PairsList';
import { PairForm } from '@/components/PairForm/PairForm';
import { TPairs, TRatio } from '@/types/types';
import { useCodes } from '@/api/useCodes';
import { useRatio } from '@/api/useRatio';

import styles from './App.module.css';

export const App: FC = () => {
  const [pairs, setPairs] = useLocalStorage<TPairs>('pairs', []);
  const [ratios, setRatios] = useLocalStorage<{ [key: string]: TRatio['rates'] }>('ratios', {});
  const [currencyBase, setCurrencyBase] = useState('');

  const { data, isLoading } = useCodes();
  const { data: ratioData, isLoading: isRatioLoading } = useRatio(currencyBase);

  const handleAddPair = (sourceCurrency: string, targetCurrency: string): void => {
    const newPair = [sourceCurrency, targetCurrency] as const;
    const newPairsData = (pairs ? [...pairs, newPair] : [newPair]) as TPairs;

    if (!ratios[sourceCurrency]) {
      setCurrencyBase(sourceCurrency);
    }

    setPairs(newPairsData);
  };

  useEffect(() => {
    if (ratioData) {
      setRatios((prev) => ({ ...prev, [currencyBase]: ratioData.rates }));
    }
  }, [ratioData]);

  const handleDeletePair = (sourceCurrency: string, targetCurrency: string): void => {
    const newPairs = pairs.filter((item) => !(item[0] === sourceCurrency && item[1] === targetCurrency));
    setPairs(newPairs);
  };

  const handleUpdate = () => {
    // chrome.runtime.sendMessage({ type: MessageType.updateRates }, function (response) {
    //   console.log(response);
    // });
  };

  if (!data || isLoading) return null;

  return (
    <div className={styles.container}>
      <PairsList pairsData={pairs} rates={ratios} onDelete={handleDeletePair} onUpdate={handleUpdate} />
      <PairForm codes={data.symbols} onAdd={handleAddPair} />
    </div>
  );
};
