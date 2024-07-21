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
  let startAmount = '0';

  if (rates[source]) {
    if (rates[source][target] >= 1) {
      startAmount = '1';
    } else if (rates[source][target] >= 0.1) {
      startAmount = '10';
    } else if (rates[source][target] >= 0.01) {
      startAmount = '100';
    } else {
      startAmount = '1000';
    }
  }

  const [ratio, setRatio] = useState(rates?.[source]?.[target] ?? 1);
  const [sourceAmount, setSourceAmount] = useState(startAmount);
  const [targetAmount, setTargetAmount] = useState((Number(sourceAmount) * ratio).toFixed(2));

  const value = rates?.[source]?.[target];

  useEffect(() => {
    setRatio(rates?.[source]?.[target]);
  }, [value]);

  const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSourceAmount(e.target.value);
    setTargetAmount((Number(e.target.value) * ratio).toFixed(2));
  };
  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTargetAmount(e.target.value);
    setSourceAmount(((Number(e.target.value) * 1) / ratio).toFixed(2));
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
