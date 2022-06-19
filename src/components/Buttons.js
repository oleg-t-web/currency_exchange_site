// here will be all buttons elements
import PropTypes from 'prop-types';

const CompButton = ({ caption, handleClick }) => {
  return <button onClick={handleClick}>{caption.toUpperCase()}</button>;
};

CompButton.propTypes = {
  caption: PropTypes.string,
  handleClick: PropTypes.func
};
export default CompButton;
