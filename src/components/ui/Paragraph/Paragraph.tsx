import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography/Typography';
import { useTheme } from '@mui/material/styles';

interface Props extends TypographyProps {
  children: React.ReactNode;
}

export const Paragraph: React.FC<Props> = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <Typography component='p' style={{ color: theme.palette.text.primary }} {...props}>
      {children}
    </Typography>
  );
};
