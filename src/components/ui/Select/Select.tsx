import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  label: string;
  options: [string, string][];
  onChange: (event: SelectChangeEvent<string>) => void;
  value?: string;
}

function getStyles(isSelected: boolean, theme: Theme) {
  return {
    fontWeight: isSelected ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
  };
}

export const UISelect: React.FC<Props> = ({ label, options, onChange, value }) => {
  const theme = useTheme();

  return (
    <div>
      <FormControl sx={{ my: 1 }} size='small' fullWidth>
        <InputLabel id='demo-multiple-name-label'>{label}</InputLabel>
        <Select
          labelId='demo-multiple-name-label'
          id='demo-multiple-name'
          value={value}
          onChange={onChange}
          input={<OutlinedInput label='name' />}
          MenuProps={MenuProps}
        >
          {options.map(([key, name]) => (
            <MenuItem key={name} value={key} style={getStyles(key === value, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Select;
