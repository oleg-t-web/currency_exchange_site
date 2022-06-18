import './App.css';
import React from 'react';
import { useState } from 'react';
import CompButton from './components/Buttons'
import CompDropDown from './components/DropDown';
import CompValueInput from './components/ValueInput';
import CompTable from './components/Table';

const OPERATION = {
  BUY: "BUY",
  SELL: "SELL"
}

const CURRENCY = {
  UAH: "UAH",
  EUR: "EUR",
  GBR: "GBR",
  USD: "USD"
}

const exchangeRates = {
  [CURRENCY.USD]: {
    [OPERATION.BUY]: 35.55,
    [OPERATION.SELL]: 35.05
  },
  [CURRENCY.EUR]: {
    [OPERATION.BUY]: 38.60,
    [OPERATION.SELL]: 38.20
  },
  [CURRENCY.GBR]: {
    [OPERATION.BUY]: 41.30,
    [OPERATION.SELL]: 41.10
  }
}

function tryConvert(amount, currency, isSell) {
  const input = parseFloat(+amount);
  if (Number.isNaN(input)) {
    return undefined;
  }

  const coef = isSell ? exchangeRates[currency][OPERATION.SELL] : exchangeRates[currency][OPERATION.SELL]

  const output = isSell ? (amount * coef) : (amount / coef);
  const rounded = output.toFixed(4);
  return rounded.toString().slice(0, -2);
}

function App() {

  const [buySell, setBuySell] = useState(OPERATION.BUY);
  const [amount, setAmount] = useState('1');
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCY.USD);

  const handleAmountChange = (amount) => {
    setAmount(amount);
  }
  const handleCurrencyChange = (selectedCurrency) => {
    setSelectedCurrency(selectedCurrency);
  }
  const handleBuySellState = () => {
    const state = buySell === OPERATION.BUY ? OPERATION.SELL : OPERATION.BUY;
    setBuySell(state);
  }
  const isSell = buySell === OPERATION.SELL;
  const convertedAmount = tryConvert(amount, selectedCurrency, isSell) || "...";
  const inputCurrency = isSell ? selectedCurrency.toUpperCase() : CURRENCY.UAH
  const localCurrency = CURRENCY.UAH;
  const inputValueCaption = `Amount in ${("" + inputCurrency).toUpperCase()}:`
  
  return (
    <div>
      <h1 align="center">
        Currency Exchange
      </h1>
      <CompTable 
        header={["Currency", "Buy", "Sell"]}
        body={exchangeRates}
        columnNames={[OPERATION.BUY, OPERATION.SELL]} 
      />
      <CompDropDown
        listValues={Object.keys(exchangeRates)}
        selectedValue={selectedCurrency}
        onValueSelected={handleCurrencyChange}
      />
      <CompButton
        handleClick={handleBuySellState}
        caption={buySell}
      />
      <CompValueInput
        value={amount}
        caption={inputValueCaption}
        onValueChange={handleAmountChange}
      />
      <p>
        Equals: {convertedAmount} {isSell ? localCurrency.toUpperCase() : selectedCurrency}
      </p>
    </div>
  );
}

export default App;