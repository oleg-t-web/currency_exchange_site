import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';

const TableRowCells = ({ values }) => {
  const rows = [];
  values.map((val) => {
    rows.push(<TableCell>{val}</TableCell>);
  });
  return <TableRow>{rows}</TableRow>;
};

TableRowCells.propTypes = {
  values: PropTypes.array
};

export default TableRowCells;
