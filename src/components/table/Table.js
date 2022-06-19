import TableHeader from './tableHeader/TableHeader';
import TableBody from './tableBody/TableBody';

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

export default CompTable;
