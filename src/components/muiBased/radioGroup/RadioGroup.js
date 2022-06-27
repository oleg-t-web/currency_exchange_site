import React from 'react';
import { RadioGroup as MUIRadioGroup } from '@mui/material';
import RadioButtonsForm from './radioButtonsForm/RadioButtonsForm';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const RadioGroup = React.memo(
  ({ currentValue, valuesList, handleValueChange }) => {
    useEffect(() => {
      console.log('RadioGroup created');
    });
    return (
      <MUIRadioGroup row value={currentValue} onChange={(e) => handleValueChange(e.target.value)}>
        <RadioButtonsForm valuesList={valuesList} />
      </MUIRadioGroup>
    );
  },
  (prewProps, nextProps) => {
    const isEqual =
      prewProps.currentValue === nextProps.currentValue &&
      Object.keys(prewProps).join('') === Object.keys(nextProps).join('') &&
      Object.values(prewProps).join('') === Object.values(prewProps).join('');
    //console.log('Compare>', isEqual);
    return isEqual;
  }
);

RadioGroup.propTypes = {
  currentValue: PropTypes.string,
  valuesList: PropTypes.object,
  handleValueChange: PropTypes.func
};
RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;
