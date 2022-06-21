import './App.css';
import React from 'react';
import { useState } from 'react';
//import CompButton from './components/Buttons';
//import CompDropDown from './components/DropDown';
//import CompValueInput from './components/ValueInput';
//import CompTable from './components/table/Table';
import { OPERATION, CURRENCY } from './CurrencyConstants';
import { tryConvert } from './helpers/TryConvertCurrency';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextField } from '@mui/material';
import MuiTable from './components/muiTable/MuiTable';
import MuiDropDown from './components/MuiDropDown';

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

        <RadioGroup
          className="buySell"
          row
          value={buySell}
          onChange={(e) => setBuySell(e.target.value)}>
          <FormControlLabel value={OPERATION.BUY} control={<Radio />} label={OPERATION.BUY} />
          <FormControlLabel value={OPERATION.SELL} control={<Radio />} label={OPERATION.SELL} />
        </RadioGroup>
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
