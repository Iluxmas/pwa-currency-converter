import { useState, useEffect, FC } from 'react';
import Spinner from '../Spinner/Spinner';
import { TRatio } from '@/types/types';

import styles from './PairItem.module.css';

type PairProps = {
  source: string;
  target: string;
  rates: {
    [key: string]: TRatio['rates'];
  };
  onDelete: (arg1: string, arg2: string) => void;
};

export const PairItem: FC<PairProps> = ({ source, target, rates, onDelete }) => {
  const [amount, setAmount] = useState(1);
  const [isSwitched, setIsSwitched] = useState(false);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    if (rates[source]) {
      setRatio(rates[source][target]);
      if (rates[source][target] >= 1) {
        setAmount(1);
      } else if (rates[source][target] >= 0.1) {
        setAmount(10);
      } else {
        setAmount(100);
      }
    }
  }, [rates, target, source]);

  return (
    <li className={styles.pairItem}>
      <input
        type='number'
        value={amount}
        min={0}
        max={9999999}
        className={styles.input}
        onChange={({ target }) => setAmount(target.valueAsNumber)}
      />
      <span className={styles.currency}>{isSwitched ? target : source}</span>
      <span>=</span>
      <p className={styles.resultValue}>
        {ratio ? (amount * (isSwitched ? 1 / ratio : ratio)).toFixed(2) : <Spinner />}
      </p>
      <span className={styles.currency}>{isSwitched ? source : target}</span>
      <button className={[styles.button, styles.buttonSwitch].join(' ')} onClick={() => setIsSwitched(!isSwitched)}>
        &#8644;
      </button>
      <button className={[styles.button, styles.buttonDelete].join(' ')} onClick={() => onDelete(source, target)}>
        &#10005;
      </button>
    </li>
  );
};
