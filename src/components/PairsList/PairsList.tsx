import { FC } from 'react';
import styles from './PairsList.module.css';
import { PairItem } from '../PairItem/PairItem';
import { TRatio } from '../../types/types';
import { UiButton } from '../ui/Button/Button';
import { Typography } from '@mui/material';

type PairListProps = {
  isLoading: boolean;
  rates: { [key: string]: TRatio['rates'] };
  pairsData: string[][];
  onDelete: (arg1: string, arg2: string) => void;
  onUpdate: () => void;
};

export const PairsList: FC<PairListProps> = ({ rates, pairsData, onDelete, onUpdate, isLoading }) => {
  if (pairsData.length === 0) {
    return (
      <Typography variant='h5' color='primary' component='h1' p={2} mb={4}>
        You haven't added any currency pairs yet.
      </Typography>
    );
  }

  return (
    <div className={styles.container}>
      <Typography variant='h5' color='primary' component='h1' py={2}>
        Existing pairs
      </Typography>
      <ul className={styles.pairsContainer}>
        {pairsData.map(([src, trgt]) => {
          return <PairItem source={src} target={trgt} key={src + trgt} rates={rates} onDelete={onDelete} />;
        })}
      </ul>
      <UiButton text='Update rates' sx={{ my: 1, height: '60px' }} isLoading={isLoading} onClick={onUpdate} />
    </div>
  );
};
