import { useCallback, useEffect } from 'react';
import styles from './App.module.css';
import { PairsList } from '../PairsList/PairsList';
import { PairForm } from '../PairForm/PairForm';
import { TPairs, TRatio } from '../../types/types';
import useLocalStorage from '../../hooks/useLocalStorage';

function App(props) {
  const [codes, setCodes] = useLocalStorage('codesList', {});
  const [pairs, setPairs] = useLocalStorage<TPairs>('pairs', []);
  const [ratios, setRatios] = useLocalStorage<TRatio[] | []>('ratios', []);

  const getNewRate = useCallback((sourceCurrency: string): void => {
    // chrome.runtime.sendMessage({ type: MessageType.getRate, value: sourceCurrency }, function (response) {
    //   setRatios(response.ratios);
    // });
  }, []);

  // get currency codes
  useEffect(() => {
    if (codes && Object.keys(codes).length === 0) {
      // chrome.runtime.sendMessage({ type: MessageType.getCodes }, function (response) {
      //   setCodes(response.codesList);
      // });
    }
  }, []);

  useEffect(() => {
    const keys = ratios.map((ratio) => Object.keys(ratio)[0]);

    for (let i = 0; i < pairs.length; i++) {
      if (keys.indexOf(pairs[i][0]) < 0) {
        getNewRate(pairs[i][0]);
      }
    }
  }, [pairs]);

  const handleAddPair = (sourceCurrency: string, targetCurrency: string): void => {
    const newPairsData = pairs ? [...pairs, [sourceCurrency, targetCurrency]] : [[sourceCurrency, targetCurrency]];
    setPairs(newPairsData);
  };

  const handleDeletePair = (sourceCurrency: string, targetCurrency: string): void => {
    const newPairs = pairs.filter((item) => !(item[0] === sourceCurrency && item[1] === targetCurrency));
    setPairs(newPairs);
  };

  const handleUpdate = () => {
    // chrome.runtime.sendMessage({ type: MessageType.updateRates }, function (response) {
    //   console.log(response);
    // });
  };

  return (
    <div className={styles.container}>
      <PairsList pairsData={pairs} rates={ratios} onDelete={handleDeletePair} onUpdate={handleUpdate} />
      <PairForm codes={codes} onAdd={handleAddPair} />
    </div>
  );
}

export default App;
