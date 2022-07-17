import PropTypes from 'prop-types';

import TableBody from './tableBody/TableBody';
import TableHeader from './tableHeader/TableHeader';

const CompTable = ({ header, body, columnNames }) => {
  return (
    <table cellSpacing="20">
      <tr>
        <TableHeader values={header} />
      </tr>
      <TableBody values={body} columnNames={columnNames} />
    </table>
  );
};
CompTable.propTypes = {
  header: PropTypes.array,
  body: PropTypes.object,
  columnNames: PropTypes.array
};

export default CompTable;
