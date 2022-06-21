import RadioGroup from '@mui/material/RadioGroup';
import RadioButtonsForm from './radioButtonsForm/RadioButtonsForm';
import PropTypes from 'prop-types';

const MUIRadioGroup = ({ currentValue, valuesList, handleValueChange }) => {
  return (
    <RadioGroup row value={currentValue} onChange={(e) => handleValueChange(e.target.value)}>
      <RadioButtonsForm valuesList={valuesList} />
    </RadioGroup>
  );
};

RadioButtonsForm.propTypes = {
  currentValue: PropTypes.string,
  valuesList: PropTypes.object,
  handleValueChange: PropTypes.func
};

export default MUIRadioGroup;
