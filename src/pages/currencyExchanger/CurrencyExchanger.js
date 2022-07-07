import './styles/exchanger.css';
import React, { useEffect, useMemo, useState } from 'react';
import { OPERATIONS, CURRENCY } from './helpers/CurrencyConstants';
import { Box, Button, TextField } from '@mui/material';
import Table from '../../components/muiBased/table/Table';
import DropDown from '../../components/muiBased/dropDown/DropDown';
import RadioGroup from '../../components/muiBased/radioGroup/RadioGroup';
import TransactionHistoryList from '../../components/muiBased/TransactionHistoryList';
import useCurrencyExchanger from './helpers/useCurrencyExchanger';
import getExchangeRates from './helpers/getExchangeRates';

function CurrencyExchanger({ initialAmount, initialCurrncy, initialOperation }) {
  const [exchangeRates, setExchangeRates] = useState({});
  const [
    operation,
    inputVal,
    currency,
    history,
    //exchangeRates,
    currencyList,
    convertedAmount,
    onCommit
  ] = useCurrencyExchanger(initialAmount, initialCurrncy, initialOperation, exchangeRates);

  useEffect(() => {
    // getExchangeRates();
    // console.log('>>>>>');
    // getExchangeRates.then((result) => {
    //   console.log('>>>>>', result);
    //   setExchangeRates(result);
    // });
    setExchangeRates(getExchangeRates());
  }, []);

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
