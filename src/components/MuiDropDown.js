import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@mui/material';

const MuiDropDown = ({ selectedValue, listValues, handleValueSelected }) => {
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

MuiDropDown.propTypes = {
  selectedValue: PropTypes.string,
  listValues: PropTypes.object,
  handleValueSelected: PropTypes.func
};

export default MuiDropDown;
