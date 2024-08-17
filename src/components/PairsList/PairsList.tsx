import { FC } from 'react';
import styles from './PairsList.module.css';
import { PairItem } from '../PairItem/PairItem';
import { TRatio } from '../../types/types';
import { Heading } from '../ui/Heading/Heading';

type PairListProps = {
  rates: { [key: string]: TRatio['rates'] };
  pairsData: string[][];
  onDelete: (arg1: string, arg2: string) => void;
};

export const PairsList: FC<PairListProps> = ({ rates, pairsData, onDelete }) => {
  if (pairsData.length === 0) {
    return (
      <Heading variant='h4' component='h1' p={2} mb={4} mt='auto' textAlign='center'>
        Hit the button below
        <br />
        and add your first pair!
      </Heading>
    );
  }

  return (
    <div className={styles.container}>
      <Heading variant='h5' component='h1' py={2}>
        Your pairs
      </Heading>
      <ul className={styles.pairsContainer}>
        {pairsData.map(([src, trgt]) => {
          return <PairItem source={src} target={trgt} key={src + trgt} rates={rates} onDelete={onDelete} />;
        })}
      </ul>
    </div>
  );
};
