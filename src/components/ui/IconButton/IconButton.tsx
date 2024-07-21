import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import Icon from '@mui/material/Icon';

interface Props extends ButtonProps {
  iconName: string;
}

export const IconButton: React.FC<Props> = ({ iconName, ...props }) => {
  return (
    <Button variant='outlined' {...props} sx={{ p: 0, minWidth: '42px', height: '42px' }}>
      <Icon fontSize='small'>{iconName}</Icon>
    </Button>
  );
};
