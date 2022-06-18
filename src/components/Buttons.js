// here will be all buttons elements
import React from 'react';
const CompButton = (props) => {
  return <button onClick={props.handleClick}>{props.caption.toUpperCase()}</button>;
};

export default CompButton;
