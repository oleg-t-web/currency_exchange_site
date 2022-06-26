import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@mui/material';
import { useEffect } from 'react';

const DropDown = ({ selectedValue, listValues, handleValueSelected }) => {
  useEffect(() => {
    console.log('DropDown created');
  });
  return (
    <TextField
      select
      value={selectedValue}
      onChange={(e) => {
        handleValueSelected(e.target.value);
      }}
      size="small">
      {Object.values(listValues).map((val) => (
        <MenuItem key={val} value={val}>
          {val}
        </MenuItem>
      ))}
    </TextField>
  );
};

DropDown.propTypes = {
  selectedValue: PropTypes.string,
  listValues: PropTypes.array,
  handleValueSelected: PropTypes.func
};

export default DropDown;
