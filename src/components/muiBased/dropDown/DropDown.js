import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@mui/material';

const DropDown = ({ selectedValue, listValues, handleValueSelected }) => {
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
