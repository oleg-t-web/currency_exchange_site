const CompDropDown = (props) => {
  const handleChange = (e) => {
    props.onValueSelected(e.target.value);
  };
  const value = props.selectedValue;
  const listValues = props.listValues;
  const getSelectList = () => {
    const children = [];
    for (let i = 0; i < listValues.length; ++i) {
      children.push(
        <option value={listValues[i]}>{listValues[i].toUpperCase()}</option>
      );
    }
    return (
      <select value={value} onChange={handleChange}>
        {children}
      </select>
    );
  };

  return getSelectList();
};

export default CompDropDown;
