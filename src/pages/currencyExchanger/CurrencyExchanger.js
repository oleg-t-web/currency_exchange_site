import React, { useMemo } from 'react';
import { Box, Button } from '@mui/material';

import Table from 'components/muiBased/table/Table';
import TransactionHistoryList from 'components/muiBased/TransactionHistoryList';
import WaitIndicator from 'components/muiBased/waitIndicator/WaitIndicator';
import OperationPicker from 'components/OperationPicker';
import OutputConverter from 'components/OutputConverter';

import { CURRENCY, OPERATIONS } from './helpers/CurrencyConstants';
import useCurrencyExchanger from './useCurrencyExchanger';

import './styles/exchanger.css';

function CurrencyExchanger({ initialAmount, initialCurrncy, initialOperation }) {
  const [
    operation,
    inputVal,
    currency,
    history,
    exchangeRates,
    currencyList,
    convertedAmount,
    onCommit,
    loadStatus
  ] = useCurrencyExchanger(initialAmount, initialCurrncy, initialOperation);

  const isSell = operation.buySell === OPERATIONS.SELL;
  const inputCurrency = isSell ? currency.selectedCurrency.toUpperCase() : CURRENCY.UAH;
  const localCurrency = CURRENCY.UAH;
  const inputValueCaption = `Amount in ${('' + inputCurrency).toUpperCase()}:`;
  const convertionResStr = `Equals: ${convertedAmount} ${
    isSell ? localCurrency.toUpperCase() : currency.selectedCurrency
  }`;
  const commitEnabled = Number(convertedAmount) > 0;

  const transactionHistoryList = useMemo(() => {
    return history.transactionHistory.slice().reverse();
  }, [history.transactionHistory.length]);

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
          values={transactionHistoryList}></TransactionHistoryList>
      </Box>
      <Table {...getCurrencyTable} />
      <OperationPicker currency={currency} currencyList={currencyList} operation={operation} />
      <OutputConverter
        inputValueCaption={inputValueCaption}
        inputVal={inputVal}
        convertionResStr={convertionResStr}
      />
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
