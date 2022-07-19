import { useContext } from 'react';
import { TransactionHistoryContext } from 'contexts/TransactionHistoryContext';

const useTransactionHistory = () => {
  return useContext(TransactionHistoryContext);
};

export default useTransactionHistory;
