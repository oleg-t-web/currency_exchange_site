import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@mui/material';
import { useEffect } from 'react';

const DropDown = React.memo(
  ({ selectedValue, listValues, handleValueSelected }) => {
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
  },
  (prewProps, nextProps) => {
    const isEqual =
      prewProps.selectedValue === nextProps.selectedValue &&
      prewProps.listValues.join('') === nextProps.listValues.join('');
    //console.log('Compare>', isEqual);
    return isEqual;
  }
);

DropDown.propTypes = {
  selectedValue: PropTypes.string,
  listValues: PropTypes.array,
  handleValueSelected: PropTypes.func
};
DropDown.displayName = 'DropDown';

export default DropDown;
