import React, { useMemo } from 'react';
import { Box, Button, TextField } from '@mui/material';

import DropDown from 'components/muiBased/dropDown/DropDown';
import RadioGroup from 'components/muiBased/radioGroup/RadioGroup';
import Table from 'components/muiBased/table/Table';
import TransactionHistoryList from 'components/muiBased/TransactionHistoryList';
import WaitIndicator from 'components/muiBased/waitIndicator/WaitIndicator';

import { CURRENCY, OPERATIONS } from './helpers/CurrencyConstants';
import useCurrencyExchanger from './helpers/useCurrencyExchanger';

import './styles/exchanger.css';
//import getExchangeRates from './helpers/getExchangeRates';

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
    loading
  ] = useCurrencyExchanger(initialAmount, initialCurrncy, initialOperation);

  // useEffect(() => {
  //   console.log('Exchanger rendered');
  //   loadExchangeRates('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json')
  //     .then((rates) => setExchangeRates(prepareRates(rates)))
  //     .catch((err) => console.log('Error> ', err));
  //   //setExchangeRates(getExchangeRates());
  // }, []);

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

  return (
    <div>
      <React.StrictMode>
        {loading.completed && <WaitIndicator />}
        {loading.message && (
          <div className="errorMessage">
            <h2> {loading.message}</h2>
          </div>
        )}
        <Box className="transactionHistoryList">
          <TransactionHistoryList
            data-testid="transactionHistory"
            values={transactionHistoryList}></TransactionHistoryList>
        </Box>
        <Table {...getCurrencyTable} />
        <div className="currencySelector">
          <DropDown
            selectedValue={currency.selectedCurrency}
            listValues={currencyList}
            handleValueSelected={currency.onCurrencyChange}
          />
          <RadioGroup
            className="buySell"
            currentValue={operation.buySell}
            valuesList={OPERATIONS}
            handleValueChange={operation.onBuySellChange}></RadioGroup>
        </div>
        <Box className="inputField">
          <TextField
            inputProps={{ 'data-testid': 'amountInput' }}
            label={inputValueCaption}
            value={inputVal.amount}
            variant="standard"
            onChange={(e) => {
              inputVal.onAmountChange(e.target.value);
            }}
            size="small"
          />
        </Box>
        <p data-testid="conversionResStr"> {convertionResStr}</p>
        <Box className="commitButtton">
          {commitEnabled && (
            <Button data-testid="commitButton" onClick={onCommit} variant="outlined">
              Commit
            </Button>
          )}
        </Box>
      </React.StrictMode>
    </div>
  );
}

export default CurrencyExchanger;
