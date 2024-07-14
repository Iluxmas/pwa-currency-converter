import { FC } from 'react';
import styles from './PairsList.module.css';
import { PairItem } from '../PairItem/PairItem';
import { TRatio } from '../../types/types';

type PairListProps = {
  rates: { [key: string]: TRatio };
  pairsData: string[][];
  onDelete: (arg1: string, arg2: string) => void;
  onUpdate: () => void;
};

export const PairsList: FC<PairListProps> = ({ rates, pairsData, onDelete, onUpdate }) => {
  if (pairsData.length === 0) {
    return null;
  }

  console.log('rates');
  console.log(rates);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Existing pairs</h1>
      <ul className={styles.pairsContainer}>
        {!!pairsData.length &&
          pairsData.map(([src, trgt]) => {
            return <PairItem source={src} target={trgt} key={src + trgt} rates={rates} onDelete={onDelete} />;
          })}
      </ul>
      <button className={styles.buttonUpdate} onClick={onUpdate}>
        Update rates
      </button>
    </div>
  );
};
