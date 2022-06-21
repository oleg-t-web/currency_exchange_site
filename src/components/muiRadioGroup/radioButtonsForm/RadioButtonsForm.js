import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import PropTypes from 'prop-types';

const RadioButtonsForm = ({ valuesList }) => {
  const buttonsList = [];
  Object.keys(valuesList).map((key) => {
    buttonsList.push(<FormControlLabel value={valuesList[key]} control={<Radio />} label={key} />);
  });
  return buttonsList;
};

RadioButtonsForm.propTypes = {
  valuesList: PropTypes.object
};

export default RadioButtonsForm;
