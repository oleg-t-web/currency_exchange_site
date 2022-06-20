import PropTypes from 'prop-types';
import { MenuItem } from '@mui/material';

const CompMenuItemsList = ({ listValues }) => {
  const list = [];
  listValues;
  Object.keys(listValues).map((key) =>
    list.push(<MenuItem value={key}> {listValues[key]}</MenuItem>)
  );
  return list;
};

CompMenuItemsList.propTypes = {
  listValues: PropTypes.object
};

export default CompMenuItemsList;
