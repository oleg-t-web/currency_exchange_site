import TableRowCells from '../tableRowCells/TableRowCells';
import PropTypes from 'prop-types';

const TableRows = ({ values, columnNames }) => {
  const table = [];
  for (let key in values) {
    const tableColumns = [key];
    columnNames.map((val) => {
      tableColumns.push(values[key][val]);
    });
    table.push(<TableRowCells key={key} values={tableColumns} />);
  }
  return table;
};

TableRows.propTypes = {
  values: PropTypes.object,
  columnNames: PropTypes.array
};

export default TableRows;
