import { FC } from 'react';
import styles from './PairsList.module.css';
import { PairItem } from '../PairItem/PairItem';
import { TRatio } from '../../types/types';
import { Typography } from '@mui/material';

type PairListProps = {
  rates: { [key: string]: TRatio['rates'] };
  pairsData: string[][];
  onDelete: (arg1: string, arg2: string) => void;
};

export const PairsList: FC<PairListProps> = ({ rates, pairsData, onDelete }) => {
  if (pairsData.length === 0) {
    return (
      <Typography variant='h4' color='primary' component='h1' p={2} mb={4} mt='auto' textAlign='center'>
        Hit the button below <br /> and add your first pair!
      </Typography>
    );
  }

  return (
    <div className={styles.container}>
      <Typography variant='h5' color='primary' component='h1' py={2}>
        Your pairs
      </Typography>
      <ul className={styles.pairsContainer}>
        {pairsData.map(([src, trgt]) => {
          return <PairItem source={src} target={trgt} key={src + trgt} rates={rates} onDelete={onDelete} />;
        })}
      </ul>
    </div>
  );
};
