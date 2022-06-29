import React from 'react';
import { RadioGroup as MUIRadioGroup } from '@mui/material';
import RadioButtonsForm from './radioButtonsForm/RadioButtonsForm';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const RadioGroup = React.memo(({ currentValue, valuesList, handleValueChange }) => {
  useEffect(() => {
    console.log('RadioGroup created');
  });
  return (
    <MUIRadioGroup row value={currentValue} onChange={(e) => handleValueChange(e.target.value)}>
      <RadioButtonsForm valuesList={valuesList} />
    </MUIRadioGroup>
  );
});

RadioGroup.propTypes = {
  currentValue: PropTypes.string,
  valuesList: PropTypes.object,
  handleValueChange: PropTypes.func
};
RadioGroup.displayName = 'RadioGroup';
RadioGroup.whyDidYouRender = true;
export default RadioGroup;
