import PropTypes from 'prop-types';

const TableHeader = ({ values }) => {
  const header = [];
  Object.values(values).map((val) => {
    header.push(<th>{val}</th>);
  });
  return header;
};

TableHeader.propTypes = {
  values: PropTypes.array
};

export default TableHeader;
