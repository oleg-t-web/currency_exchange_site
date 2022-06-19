const CompValueInput = ({ value, caption, handleChange }) => {
  const onChange = (e) => {
    handleChange(e.target.value);
  };

  return (
    <div>
      <legend>{caption}</legend>
      <input value={value} onChange={onChange} />
    </div>
  );
};

export default CompValueInput;
