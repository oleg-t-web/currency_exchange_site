const TableHeader = (props) => {
  const values = props.values;
  const header = [];
  for (let val of values) {
    header.push(<th>{val}</th>);
  }
  return header;
};

const TableBody = (props) => {
  const values = props.values;
  const columnNames = props.columnNames;
  const table = [];
  for (let key in values) {
    const children = [];
    children.push(<td>{"" + key.toUpperCase()}</td>);
    for (let val of columnNames) {
      children.push(<td>{values[key][val].toFixed(2)}</td>);
    }
    table.push(<tr>{children}</tr>);
  }
  return table;
};

const CompTable = (props) => {
  const header = props.header;
  const body = props.body;
  const columnNames = props.columnNames;

  return (
    <table cellspacing="20">
      <tr>
        <TableHeader values={header} />
      </tr>
      <TableBody values={body} columnNames={columnNames} />
    </table>
  );
};

export default CompTable;
