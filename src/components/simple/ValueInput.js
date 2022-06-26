import PropTypes from 'prop-types';

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

CompValueInput.propTypes = {
  value: PropTypes.string,
  caption: PropTypes.string,
  handleChange: PropTypes.func
};

export default CompValueInput;
