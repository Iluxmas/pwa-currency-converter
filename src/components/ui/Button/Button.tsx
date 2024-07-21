import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import Spinner from '@/components/Spinner/Spinner';

interface Props extends ButtonProps {
  text: string;
  isLoading?: boolean;
}

export const UiButton: React.FC<Props> = ({ text, isLoading = false, ...props }) => {
  return (
    <Button variant='outlined' style={{ justifyContent: 'center', display: 'flex' }} {...props}>
      {isLoading ? <Spinner /> : text}
    </Button>
  );
};
