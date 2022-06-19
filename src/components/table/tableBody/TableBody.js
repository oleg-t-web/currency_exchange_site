const TableBody = ({ values, columnNames }) => {
  const table = [];
  for (let key in values) {
    const children = [];
    children.push(<td>{'' + key.toUpperCase()}</td>);
    Object.values(columnNames).map((val) => {
      children.push(<td>{values[key][val]}</td>);
    });
    table.push(<tr>{children}</tr>);
  }
  return table;
};

export default TableBody;
