import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface Props extends TextFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const Input: React.FC<Props> = ({ label, value, onChange, ...props }) => {
  return (
    <TextField
      {...props}
      label={label}
      value={value}
      size='small'
      onChange={onChange}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{ style: { textAlign: 'end' } }}
    />
  );
};
