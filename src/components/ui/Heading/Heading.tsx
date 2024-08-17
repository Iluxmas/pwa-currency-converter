import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography/Typography';

interface Props extends TypographyProps {
  children: React.ReactNode;
}

export const Heading: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Typography color='primary' {...props}>
      {children}
    </Typography>
  );
};
