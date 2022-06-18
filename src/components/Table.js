const TableHeader = ({ values }) => {
  const header = [];
  for (let val of values) {
    header.push(<th>{val}</th>);
  }
  return header;
};

const TableBody = ({ values, columnNames }) => {
  const table = [];
  for (let key in values) {
    const children = [];
    children.push(<td>{'' + key.toUpperCase()}</td>);
    for (let val of columnNames) {
      children.push(<td>{values[key][val]}</td>);
    }
    table.push(<tr>{children}</tr>);
  }
  return table;
};

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
