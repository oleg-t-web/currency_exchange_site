import './App.css';
import React from 'react';
import { useState } from 'react';
//import CompButton from './components/Buttons';
//import CompDropDown from './components/DropDown';
//import CompValueInput from './components/ValueInput';
//import CompTable from './components/table/Table';
import { OPERATIONS, CURRENCY } from './CurrencyConstants';
import { tryConvert } from './helpers/TryConvertCurrency';
import { TextField } from '@mui/material';
import MuiTable from './components/muiTable/MuiTable';
import MuiDropDown from './components/MuiDropDown';
import MUIRadioGroup from './components/muiRadioGroup/MUIRadioGroup';

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

  const handleAmountChange = (amount) => {
    setAmount(amount);
  };
  const handleCurrencyChange = (selectedCurrency) => {
    setSelectedCurrency(selectedCurrency);
  };

  return (
    <div>
      <h1 align="center">Currency Exchange</h1>
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
      <p>
        <TextField
          label={inputValueCaption}
          value={amount}
          variant="standard"
          onChange={(e) => {
            handleAmountChange(e.target.value);
          }}
          size="small"
        />
      </p>

      <p> {convertionResStr}</p>
    </div>
  );
}

export default App;
