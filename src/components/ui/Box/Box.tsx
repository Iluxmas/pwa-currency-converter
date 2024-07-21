import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

interface Props extends BoxProps {
  children: React.ReactNode;
}

export const UIBox: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Box my={2} display='flex' alignItems='center' gap={1} {...props}>
      {children}
    </Box>
  );
};
