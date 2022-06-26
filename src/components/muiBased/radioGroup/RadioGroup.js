import { RadioGroup as MUIRadioGroup } from '@mui/material';
import RadioButtonsForm from './radioButtonsForm/RadioButtonsForm';
import PropTypes from 'prop-types';

const RadioGroup = ({ currentValue, valuesList, handleValueChange }) => {
  return (
    <MUIRadioGroup row value={currentValue} onChange={(e) => handleValueChange(e.target.value)}>
      <RadioButtonsForm valuesList={valuesList} />
    </MUIRadioGroup>
  );
};

RadioGroup.propTypes = {
  currentValue: PropTypes.string,
  valuesList: PropTypes.object,
  handleValueChange: PropTypes.func
};

export default RadioGroup;
