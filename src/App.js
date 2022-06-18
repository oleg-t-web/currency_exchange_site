import './App.css';
import React from 'react';
import { useState } from 'react';

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
    buy: 35.55,
    sell: 35.05
  },
  [CURRENCY.EUR]: {
    buy: 38.60,
    sell: 38.20
  },
  [CURRENCY.GBR]: {
    buy: 41.30,
    sell: 41.10
  }
}

function tryConvert(amount, currency, isSell) {
  const input = parseFloat(+amount);
  if (Number.isNaN(input)) {
    return undefined;
  }

  const coef = isSell ? exchangeRates[currency].sell : exchangeRates[currency].buy

  const output = isSell ? (amount * coef) : (amount / coef);
  const rounded = output.toFixed(4);
  return rounded.toString().slice(0, -2);
}

function CurrencyTable(props) {

  const propsList = props.currencyList;
  let GetTable = () => {
    let table = [];
    for (let key in propsList) {
      let children = [];
      children.push(<td>{("" + key.toUpperCase())}</td>);
      children.push(<td>{propsList[key].buy.toFixed(2)}</td>);
      children.push(<td>{propsList[key].sell.toFixed(2)}</td>);

      table.push(<tr>{children}</tr>);
    }
    return table;
  }

  return <table cellspacing="20">
    <tr>
      <th>Currency</th>
      <th>Buy</th>
      <th>Sell</th>
    </tr>
    <GetTable />
  </table>
}

function BuySellButton(props) {


  const handleClick = () => {
    const value = props.param === OPERATION.BUY ? OPERATION.SELL : OPERATION.BUY
    props.handleClick(value);
  }

  return (
    <button onClick={handleClick}>{props.param.toUpperCase()}</button>
  );
}

//todo in separate file
function DropDown(props) {

  const handleChange = (e) => {
    props.onValueSelected(e.target.value);
  }
  let value = props.selectedValue;
  let listValues = props.listValues;
  let getSelectList = () => {
    let children = [];
    for (let i = 0; i < listValues.length; ++i) {
      children.push(<option value={listValues[i]}>{listValues[i].toUpperCase()}</option>)
    }
    return (<select value={value} onChange={handleChange}>{children}</select>)
  }

  return getSelectList();
}

//todo in separate file
function AmountInput(props) {

  const handleChange = (e) => {
    props.onValueChange(e.target.value);
  }
  const amount = props.amount;
  const currency = props.currency;

  return (
    <div>
      <legend>Amount in {("" + currency).toUpperCase()}:</legend>
      <input value={amount}
        onChange={handleChange} />
    </div>
  );

}

function App () {

  const [buySell, setBuySell] = useState(OPERATION.BUY);
  const [amount, setAmount] = useState('1');
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCY.USD);
  
  const handleAmountChange = (amount) => {
    setAmount(amount);
  }
  const handleCurrencyChange = (selectedCurrency) => {
    setSelectedCurrency(selectedCurrency);
  }
  const handleBuySellState = (buySell) => {
    setBuySell(buySell);
  }
    const isSell = buySell === OPERATION.SELL;
    const convertedAmount = tryConvert(amount, selectedCurrency, isSell) || "...";
    const inputCurrency = isSell ? selectedCurrency.toUpperCase() : CURRENCY.UAH
    const localCurrency = CURRENCY.UAH;
    return (
      <div>
        <h1 align="center">
          Currency Exchange
        </h1>
        <CurrencyTable currencyList={exchangeRates} />
        <DropDown
          listValues={Object.keys(exchangeRates)}
          selectedValue={selectedCurrency}
          onValueSelected={handleCurrencyChange}
        />
        <BuySellButton
          handleClick={handleBuySellState}
          param={buySell}
        />
        <AmountInput
          currency={inputCurrency}
          amount={amount}
          onValueChange={handleAmountChange}
        />
        <p>
          Equals: {convertedAmount} {isSell ? localCurrency.toUpperCase() : selectedCurrency}
        </p>
      </div>
    );
}

export default App;