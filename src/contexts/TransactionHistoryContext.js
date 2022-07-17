import React, { createContext, useState } from 'react';

export const TransactionHistoryContext = createContext();

const TransactionHistoryContextProvider = ({ children }) => {
  const [transactionHistory, setTransactionHistory] = useState([]);

  const addTransactionRecord = (tranRec) => {
    // setTransactionHistory((prev) => [...prev, tranRec]);
    setTransactionHistory((prev) => [tranRec, ...prev]);
  };

  return (
    <TransactionHistoryContext.Provider value={{ transactionHistory, addTransactionRecord }}>
      {children}
    </TransactionHistoryContext.Provider>
  );
};

export default TransactionHistoryContextProvider;
