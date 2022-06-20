import './App.css';
import React from 'react';
import { useState } from 'react';
//import CompButton from './components/Buttons';
//import CompDropDown from './components/DropDown';
//import CompValueInput from './components/ValueInput';
import CompTable from './components/table/Table';
import { OPERATION, CURRENCY } from './CurrencyConstants';
import { tryConvert } from './helpers/TryConvertCurrency';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextField, MenuItem } from '@mui/material';
//import { TextField } from '@mui/material';
//import CompMenuItemsList from './components/MenuItemsList';

const exchangeRates = {
  [CURRENCY.USD]: {
    [OPERATION.BUY]: 35.55,
    [OPERATION.SELL]: 35.05
  },
  [CURRENCY.EUR]: {
    [OPERATION.BUY]: 38.6,
    [OPERATION.SELL]: 38.2
  },
  [CURRENCY.GBR]: {
    [OPERATION.BUY]: 41.3,
    [OPERATION.SELL]: 41.1
  }
};
const currencyList = Object.keys(exchangeRates);
function App() {
  const [buySell, setBuySell] = useState(OPERATION.BUY);
  const [amount, setAmount] = useState('1');
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCY.USD);

  const isSell = buySell === OPERATION.SELL;
  const convertedAmount = tryConvert(amount, selectedCurrency, isSell, exchangeRates) || '...';
  const inputCurrency = isSell ? selectedCurrency.toUpperCase() : CURRENCY.UAH;
  const localCurrency = CURRENCY.UAH;
  const inputValueCaption = `Amount in ${('' + inputCurrency).toUpperCase()}:`;
  const currencyTableHeader = ['Currency', 'Buy', 'Sell'];
  const currencyTableColumnNames = [OPERATION.BUY, OPERATION.SELL];
  const convertionResStr = `Equals: ${convertedAmount} ${
    isSell ? localCurrency.toUpperCase() : selectedCurrency
  }`;

  const handleAmountChange = (amount) => {
    setAmount(amount);
  };
  const handleCurrencyChange = (selectedCurrency) => {
    setSelectedCurrency(selectedCurrency);
  };
  // const handleBuySellState = () => {
  //   const state = buySell === OPERATION.BUY ? OPERATION.SELL : OPERATION.BUY;
  //   setBuySell(state);
  // };

  return (
    <div>
      <h1 align="center">Currency Exchange</h1>
      <CompTable
        header={currencyTableHeader}
        body={exchangeRates}
        columnNames={currencyTableColumnNames}
      />
      <div className="currencySelector">
        <TextField
          select
          value={selectedCurrency}
          onChange={(e) => {
            handleCurrencyChange(e.target.value);
          }}
          size="small">
          {Object.values(currencyList).map((val) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </TextField>
        {/* <CompDropDown
          listValues={currencyList}
          selectedValue={selectedCurrency}
          handleValueSelected={handleCurrencyChange}
        /> */}
        <RadioGroup
          className="buySell"
          row
          value={buySell}
          onChange={(e) => setBuySell(e.target.value)}>
          <FormControlLabel value={OPERATION.BUY} control={<Radio />} label="Buy" />
          <FormControlLabel value={OPERATION.SELL} control={<Radio />} label="Sell" />
        </RadioGroup>
      </div>
      {/* <CompValueInput
        value={amount}
        caption={inputValueCaption}
        handleChange={handleAmountChange}
      /> */}
      <p>{inputValueCaption}</p>
      <TextField
        value={amount}
        onChange={(e) => {
          handleAmountChange(e.target.value);
        }}
        size="small"
      />

      <p> {convertionResStr}</p>
    </div>
  );
}

export default App;
