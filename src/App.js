import './App.css';
import React from 'react';
import { useState } from 'react';
//import CompButton from './components/Buttons';
//import CompDropDown from './components/DropDown';
//import CompValueInput from './components/ValueInput';
//import CompTable from './components/table/Table';
import { OPERATIONS, CURRENCY } from './CurrencyConstants';
import { tryConvert } from './helpers/TryConvertCurrency';
import { Box, Button, TextField } from '@mui/material';
import MuiTable from './components/muiTable/MuiTable';
import MuiDropDown from './components/MuiDropDown';
import MUIRadioGroup from './components/muiRadioGroup/MUIRadioGroup';
import TransactionHistoryList from './components/TransactionHistoryList';

const exchangeRates = {
  [CURRENCY.USD]: {
    [OPERATIONS.BUY]: 35.55,
    [OPERATIONS.SELL]: 35.05
  },
  [CURRENCY.EUR]: {
    [OPERATIONS.BUY]: 38.6,
    [OPERATIONS.SELL]: 38.2
  },
  [CURRENCY.GBR]: {
    [OPERATIONS.BUY]: 41.3,
    [OPERATIONS.SELL]: 41.1
  }
};
const currencyList = Object.keys(exchangeRates);
function App() {
  const [buySell, setBuySell] = useState(OPERATIONS.BUY);
  const [amount, setAmount] = useState('1');
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCY.USD);
  // eslint-disable-next-line no-unused-vars
  const [transactionHistory, setTransactionHistory] = useState([]);

  const isSell = buySell === OPERATIONS.SELL;
  const convertedAmount = tryConvert(amount, selectedCurrency, isSell, exchangeRates) || '...';
  const inputCurrency = isSell ? selectedCurrency.toUpperCase() : CURRENCY.UAH;
  const localCurrency = CURRENCY.UAH;
  const inputValueCaption = `Amount in ${('' + inputCurrency).toUpperCase()}:`;
  const currencyTableHeader = ['Currency', 'Buy', 'Sell'];
  const currencyTableColumnNames = [OPERATIONS.BUY, OPERATIONS.SELL];
  const convertionResStr = `Equals: ${convertedAmount} ${
    isSell ? localCurrency.toUpperCase() : selectedCurrency
  }`;
  const commitEnabled = +convertedAmount > 0;

  const handleAmountChange = (amount) => {
    setAmount(amount);
  };
  const handleCurrencyChange = (selectedCurrency) => {
    setSelectedCurrency(selectedCurrency);
  };
  const handleCommit = () => {
    const transaction = {
      operation: buySell,
      currency: selectedCurrency,
      amount: +amount,
      date: new Date().toJSON()
    };
    setTransactionHistory((prev) => [...prev, transaction]);
    setAmount('');
    console.log(JSON.stringify(transaction));
  };

  return (
    <div>
      <h1 align="center">Currency Exchange</h1>
      <Box className="transactionHistoryList">
        <TransactionHistoryList
          values={transactionHistory.slice().reverse()}></TransactionHistoryList>
      </Box>
      <MuiTable
        header={currencyTableHeader}
        body={exchangeRates}
        columnNames={currencyTableColumnNames}
      />

      <div className="currencySelector">
        <MuiDropDown
          selectedValue={selectedCurrency}
          listValues={currencyList}
          handleValueSelected={handleCurrencyChange}
        />
        <MUIRadioGroup
          className="buySell"
          currentValue={buySell}
          valuesList={OPERATIONS}
          handleValueChange={setBuySell}></MUIRadioGroup>
      </div>
      <Box className="inputField">
        <TextField
          label={inputValueCaption}
          value={amount}
          variant="standard"
          onChange={(e) => {
            handleAmountChange(e.target.value);
          }}
          size="small"
        />
      </Box>
      <p> {convertionResStr}</p>
      <Box className="commitButtton">
        {commitEnabled && (
          <Button onClick={handleCommit} variant="outlined">
            Commit
          </Button>
        )}
      </Box>
    </div>
  );
}

export default App;
