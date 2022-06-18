// here will be all buttons elements
const CompButton = (props) => {
    return (
      <button onClick={props.handleClick}>{props.caption.toUpperCase()}</button>
    );
  }

  export default CompButton;
