import React, { useContext, useMemo } from 'react';
import { Box, Button } from '@mui/material';
import { TransactionHistoryContext } from 'contexts/TransactionHistoryContext';

import Table from 'components/muiBased/table/Table';
import TransactionHistoryList from 'components/muiBased/TransactionHistoryList';
import WaitIndicator from 'components/muiBased/waitIndicator/WaitIndicator';
import OperationPicker from 'components/OperationPicker';
import OutputConverter from 'components/OutputConverter';

import { LOCAL_CURRENCY, OPERATIONS } from './helpers/CurrencyConstants';
import useCurrencyExchanger from './useCurrencyExchanger';

import './styles/exchanger.css';

function CurrencyExchanger({ initialAmount, initialCurrncy, initialOperation }) {
  const [
    operation,
    inputVal,
    currency,
    exchangeRates,
    currencyList,
    convertedAmount,
    onCommit,
    loadStatus
  ] = useCurrencyExchanger(initialAmount, initialCurrncy, initialOperation);

  const { transactionHistory } = useContext(TransactionHistoryContext);

  const isSell = operation.buySell === OPERATIONS.SELL;
  const inputCurrency = isSell ? currency.selectedCurrency.toUpperCase() : LOCAL_CURRENCY;
  const inputValueCaption = `Amount in ${('' + inputCurrency).toUpperCase()}:`;
  const convertionResStr = `Equals: ${convertedAmount} ${
    isSell ? LOCAL_CURRENCY.toUpperCase() : currency.selectedCurrency
  }`;
  const commitEnabled = Number(convertedAmount) > 0;

  const getCurrencyTable = useMemo(() => {
    return {
      header: ['Currency', 'Buy', 'Sell'],
      body: exchangeRates,
      columnNames: [OPERATIONS.BUY, OPERATIONS.SELL]
    };
  }, [exchangeRates]);

  if (!loadStatus.completed || loadStatus.message) {
    return (
      <div>
        {!loadStatus.completed && <WaitIndicator />}
        {loadStatus.message && (
          <div className="errorMessage">
            <h2> {loadStatus.message}</h2>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Box className="transactionHistoryList">
        <TransactionHistoryList
          data-testid="transactionHistory"
          values={transactionHistory}></TransactionHistoryList>
      </Box>
      <Table {...getCurrencyTable} />
      <OperationPicker {...{ currency, currencyList, operation }} />
      <OutputConverter {...{ inputValueCaption, inputVal, convertionResStr }} />
      <Box className="commitButtton">
        <Button
          data-testid="commitButton"
          onClick={onCommit}
          variant="outlined"
          disabled={!commitEnabled}>
          Commit
        </Button>
      </Box>
    </div>
  );
}

export default CurrencyExchanger;
