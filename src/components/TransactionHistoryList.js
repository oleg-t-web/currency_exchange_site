import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';

const TransactionHistoryList = ({ values }) => {
  const list = [];
  values.map((transaction, i) => {
    const info = ` ${transaction.operation} ${transaction.amount}  ${transaction.currency}`;
    const date = transaction.date.slice(0, 19).replace(/-/g, '/').replace('T', ' ');
    list.push(
      <ListItem key={i} alignItems="flex-start">
        <ListItemText primary={info} secondary={date} />
      </ListItem>
    );
  });

  return <List>{list}</List>;
};

TransactionHistoryList.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object)
};

export default TransactionHistoryList;
