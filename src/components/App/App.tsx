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

  const { codes, isLoading } = useCodes();
  const { data } = useRatio(currencyBase);

  const handleAddPair = (sourceCurrency: string, targetCurrency: string): void => {
    const newPair = [sourceCurrency, targetCurrency] as const;
    const newPairsData = (pairs ? [...pairs, newPair] : [newPair]) as TPairs;

    if (!ratios || !ratios[sourceCurrency]) {
      setCurrencyBase(sourceCurrency);
    }

    setPairs(newPairsData);
  };

  useEffect(() => {
    if (data) {
      setRatios((prev) => ({ ...prev, [currencyBase]: data }));
    }
  }, [data]);

  const handleDeletePair = (sourceCurrency: string, targetCurrency: string): void => {
    const newPairs = pairs.filter((item) => !(item[0] === sourceCurrency && item[1] === targetCurrency));
    setPairs(newPairs);
  };

  const handleUpdate = () => {
    // chrome.runtime.sendMessage({ type: MessageType.updateRates }, function (response) {
    //   console.log(response);
    // });
  };

  if (!codes || isLoading || !ratios) return null;

  return (
    <div className={styles.container}>
      <PairsList pairsData={pairs} rates={ratios} onDelete={handleDeletePair} onUpdate={handleUpdate} />
      <PairForm codes={codes} onAdd={handleAddPair} />
    </div>
  );
};
