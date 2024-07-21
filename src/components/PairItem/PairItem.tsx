import { useState, FC, useEffect } from 'react';
import { TRatio } from '@/types/types';
import { IconButton } from '../ui/IconButton/IconButton';
import { Input } from '../ui/Input/Input';
import { UIBox } from '../ui/Box/Box';
import { Icon } from '@mui/material';

type PairProps = {
  source: string;
  target: string;
  rates: {
    [key: string]: TRatio['rates'];
  };
  onDelete: (arg1: string, arg2: string) => void;
};

export const PairItem: FC<PairProps> = ({ source, target, rates, onDelete }) => {
  const ratio = rates?.[source]?.[target] ?? 1;

  const [sourceAmount, setSourceAmount] = useState('1');
  const [targetAmount, setTargetAmount] = useState((Number(sourceAmount) * ratio).toFixed(2));

  useEffect(() => {
    if (!rates || !rates[source]) return;
    let newSourceAmount = '1';

    if (rates[source]) {
      if (rates[source][target] >= 1) {
        newSourceAmount = '1';
      } else if (rates[source][target] >= 0.1) {
        newSourceAmount = '10';
      } else if (rates[source][target] >= 0.01) {
        newSourceAmount = '100';
      } else {
        newSourceAmount = '1000';
      }
    }

    setSourceAmount(newSourceAmount);
    setTargetAmount((Number(newSourceAmount) * rates?.[source]?.[target]).toFixed(2));
  }, [rates[source]]);

  const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSourceAmount(e.target.value);
    setTargetAmount((Number(e.target.value) * ratio).toFixed(2));
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTargetAmount(e.target.value);
    setSourceAmount((Number(e.target.value) / ratio).toFixed(2));
  };

  return (
    <UIBox sx={{ flexWrap: 'nowrap' }}>
      <Input label={source} value={sourceAmount} onChange={handleSourceChange} />
      <Icon fontSize='small'>sync_alt</Icon>
      <Input label={target} value={targetAmount} onChange={handleTargetChange} />
      <IconButton iconName='close' onClick={() => onDelete(source, target)} />
    </UIBox>
  );
};
