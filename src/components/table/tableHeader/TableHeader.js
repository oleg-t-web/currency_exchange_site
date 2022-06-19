const TableHeader = ({ values }) => {
  const header = [];
  Object.values(values).map((val) => {
    header.push(<th>{val}</th>);
  });
  return header;
};

export default TableHeader;
