import { useMemo } from 'react';
import PropTypes from 'prop-types';

const CompDropDown = ({ selectedValue, listValues, handleValueSelected }) => {
  const onChange = (e) => {
    handleValueSelected(e.target.value);
  };
  const getSelectList = useMemo(() => {
    console.log('getSelectList Called');
    const children = [];
    for (let i = 0; i < listValues.length; ++i) {
      children.push(<option value={listValues[i]}>{listValues[i].toUpperCase()}</option>);
    }
    return (
      <select value={selectedValue} onChange={onChange}>
        {children}
      </select>
    );
  }, [selectedValue]);

  return getSelectList;
};

CompDropDown.propTypes = {
  selectedValue: PropTypes.string,
  listValues: PropTypes.array,
  handleValueSelected: PropTypes.func
};

export default CompDropDown;
