import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const TransactionHistoryList = React.memo(({ values }) => {
  useEffect(() => {
    console.log('Transaction history created');
  });
  const list = [];
  values.map((transaction, i) => {
    const info = ` ${transaction.operation} ${transaction.amount}  ${transaction.currency}`;
    const date = transaction.date.slice(0, 19).replace(/-/g, '/').replace('T', ' ');
    list.push(
      <ListItem key={i} alignItems="flex-start" data-testid="transactionRecord">
        <ListItemText primary={info} secondary={date} />
      </ListItem>
    );
  });

  return <List>{list}</List>;
});

TransactionHistoryList.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object)
};
TransactionHistoryList.displayName = 'TransactionHistoryList';
TransactionHistoryList.whyDidYouRender = true;
export default TransactionHistoryList;
