import React from 'react';
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableHead as MuiTableHead
} from '@mui/material';
import TableRowCells from './tableRowCells/TableRowCells';
import TableRows from './tableRows/TableRows';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Table = React.memo(({ header, body, columnNames }) => {
  useEffect(() => {
    console.log('Table created!!!!!!!!!!!!!!!!');
  });
  return (
    <MuiTable aria-label="simple table" size="medium" style={{ width: 500 }}>
      <MuiTableHead>
        <TableRowCells values={header} />
      </MuiTableHead>
      <MuiTableBody>
        <TableRows values={body} columnNames={columnNames} />
      </MuiTableBody>
    </MuiTable>
  );
});

Table.propTypes = {
  header: PropTypes.array,
  body: PropTypes.object,
  columnNames: PropTypes.array
};
Table.displayName = 'Table';
export default Table;
