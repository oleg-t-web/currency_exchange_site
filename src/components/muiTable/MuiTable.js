import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRowCells from './tableRowCells/TableRowCells';
import TableRows from './tableRows/TableRows';
import PropTypes from 'prop-types';

const MuiTable = ({ header, body, columnNames }) => {
  return (
    <Table aria-label="simple table" size="medium" style={{ width: 500 }}>
      <TableHead>
        <TableRowCells values={header} />
      </TableHead>
      <TableBody>
        <TableRows values={body} columnNames={columnNames} />
      </TableBody>
    </Table>
  );
};

MuiTable.propTypes = {
  header: PropTypes.array,
  body: PropTypes.object,
  columnNames: PropTypes.array
};

export default MuiTable;
