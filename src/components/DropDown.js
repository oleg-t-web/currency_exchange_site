import { useMemo } from 'react';

const CompDropDown = ({ selectedValue, listValues, onValueSelected }) => {
  const handleChange = (e) => {
    onValueSelected(e.target.value);
  };
  const getSelectList = useMemo(() => {
    console.log('getSelectList Called');
    const children = [];
    for (let i = 0; i < listValues.length; ++i) {
      children.push(<option value={listValues[i]}>{listValues[i].toUpperCase()}</option>);
    }
    return (
      <select value={selectedValue} onChange={handleChange}>
        {children}
      </select>
    );
  }, [selectedValue]);

  return getSelectList;
};

export default CompDropDown;
