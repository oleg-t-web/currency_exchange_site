// here will be all buttons elements
import React from 'react';
const CompButton = ({ caption, handleClick }) => {
  return <button onClick={handleClick}>{caption.toUpperCase()}</button>;
};

export default CompButton;
