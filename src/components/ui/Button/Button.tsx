import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import Spinner from '@/components/Spinner/Spinner';

interface Props extends ButtonProps {
  text: string;
  isLoading?: boolean;
  variant?: 'text' | 'contained' | 'outlined';
}

export const UiButton: React.FC<Props> = ({ variant = 'outlined', text, isLoading = false, ...props }) => {
  return (
    <Button
      variant={variant}
      style={{ justifyContent: 'center', display: 'flex' }}
      {...props}
      sx={{ my: 1, height: '60px', ...props.sx }}
    >
      {isLoading ? <Spinner /> : text}
    </Button>
  );
};
