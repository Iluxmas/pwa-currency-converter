import { useState, FC } from 'react';
import styles from './PairForm.module.css';
import { UiButton } from '../ui/Button/Button';
import { UISelect } from '../ui/Select/Select';
import { useCodes } from '@/api/useCodes';
import Spinner from '../Spinner/Spinner';
import { Typography } from '@mui/material';
import { DrawerPopup } from '../ui/DrawerPopup/DrawerPopup';

type PairFormProps = {
  onAdd: (arg1: string, arg2: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

export const PairForm: FC<PairFormProps> = ({ onAdd, isOpen, onClose }) => {
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

  const options = Object.entries(codes);

  return (
    <>
      <DrawerPopup isOpen={isOpen} onClose={onClose}>
        <Typography variant='h5' color='primary' component='h2' py={1}>
          Currencies
        </Typography>
        <UISelect label='source' options={options} onChange={({ target }) => setSource(target.value)} value={source} />
        <UISelect label='target' options={options} onChange={({ target }) => setTarget(target.value)} value={target} />
        <UiButton text='Add' onClick={addNewPair} disabled={!source || !target || source === target} />
      </DrawerPopup>
    </>
  );
};
