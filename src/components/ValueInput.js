const CompValueInput = ({ value, caption, onValueChange }) => {
  const handleChange = (e) => {
    onValueChange(e.target.value);
  };

  return (
    <div>
      <legend>{caption}</legend>
      <input value={value} onChange={handleChange} />
    </div>
  );
};

export default CompValueInput;
