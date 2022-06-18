const CompValueInput = (props) => {
  const handleChange = (e) => {
    props.onValueChange(e.target.value);
  };
  let value = props.value;
  const caption = props.caption;

  return (
    <div>
      <legend>{caption}</legend>
      <input value={value} onChange={handleChange} />
    </div>
  );
};

export default CompValueInput;
