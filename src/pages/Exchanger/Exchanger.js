import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { Box, Button } from '@mui/material';
import useLoadIndicator from 'hooks/useLoadIndicator';
import useTransactionHistory from 'hooks/useTransactionHistory';

import OperationPicker from 'components/exchanger/OperationPicker';
import Table from 'components/muiBased/Table/Table';
import TransactionHistoryList from 'components/muiBased/TransactionHistoryList';
//import WaitIndicator from 'components/muiBased/WaitIndicator/WaitIndicator';
import OutputConverter from 'components/OutputConverter';

import { LOCAL_CURRENCY, OPERATIONS } from './helpers/CurrencyConstants';
import useCurrencyExchanger from './useCurrencyExchanger';

import './styles/exchanger.css';

function CurrencyExchanger() {
  //do not know how to place them in row :((
  const [operation, inputField, currency, exchangeRates, currencyList, convertedAmount, onCommit] =
    useCurrencyExchanger();

  const { isLoading, error } = useLoadIndicator();
  const { transactionHistory } = useTransactionHistory();

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

  if (isLoading || error) {
    return (
      <div>
        {/* {isLoading && <WaitIndicator />} */}
        {error && (
          <div className="errorMessage">
            <h2> {error}</h2>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Box className="transactionHistoryList">
        <TransactionHistoryList data-testid="transactionHistory" values={transactionHistory} />
      </Box>
      <Table {...getCurrencyTable} />
      <OperationPicker {...{ ...currency, currencyList, ...operation }} />
      <OutputConverter
        {...{
          inputValueCaption,
          inputValue: inputField.amount,
          handleInputChange: inputField.onAmountChange,
          convertionResStr
        }}
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

const mapStateToProps = (state) => {
  console.log('mapStateToProps > ', state);
  const { operation, selectedCurrency, input } = state;
  return {
    initialValues: {
      amount: input.amount,
      operation: operation.buySell,
      currency: selectedCurrency.currency
    }
  };
};

export default connect(mapStateToProps)(CurrencyExchanger);
