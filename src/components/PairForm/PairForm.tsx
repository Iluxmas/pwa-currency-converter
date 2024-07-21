import { useState, FC } from 'react';
import styles from './PairForm.module.css';
import { UiButton } from '../ui/Button/Button';
import { UISelect } from '../ui/Select/Select';
import { useCodes } from '@/api/useCodes';
import Spinner from '../Spinner/Spinner';
import { Typography } from '@mui/material';

type PairFormProps = {
  onAdd: (arg1: string, arg2: string) => void;
};

export const PairForm: FC<PairFormProps> = ({ onAdd }) => {
  const [source, setSource] = useState<string | undefined>();
  const [target, setTarget] = useState<string | undefined>();

  const { codes, isLoading } = useCodes();

  function addNewPair() {
    if (!source || !target) return;

    onAdd(source, target);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!codes) return null;

  return (
    <div className={styles.formContainer}>
      <Typography variant='h5' color='primary' component='h2' py={1}>
        Currencies
      </Typography>
      <UISelect
        label='source'
        options={Object.entries(codes)}
        onChange={({ target }) => setSource(target.value)}
        value={source}
      />
      <UISelect
        label='target'
        options={Object.entries(codes)}
        onChange={({ target }) => setTarget(target.value)}
        value={target}
      />
      <UiButton
        text='Add Pair'
        onClick={addNewPair}
        disabled={!source || !target || source === target}
        sx={{ my: 1, height: '60px' }}
      />
    </div>
  );
};
