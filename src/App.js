import './App.css';
import React from 'react';

const exchangeRates = {
  usd: {
    buy: 35.55,
    sell: 35.05
  },
  eur: {
    buy: 38.60,
    sell: 38.20
  },
  gbr: {
    buy: 41.30,
    sell: 41.10
  }
}

function tryConvert(amount, currency, isSell) {
  const input = parseFloat(+amount);
  if (Number.isNaN(input)) {
    return '...';
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
    const value = props.param === 'buy' ? 'sell' : 'buy' 
    props.handleClick(value);
  }

  return (
    <button onClick={handleClick}>{props.param.toUpperCase()}</button>
  );
}

//todo in separate file
class DropDown extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
  this.props.onValueSelected(e.target.value);
  }

  render() {
    let value = this.props.selectedValue;
    let listValues = this.props.listValues;
    let getSelectList = () => {
      
      let children = [];
      for(let i = 0; i < listValues.length; ++i ) {
        children.push(<option value={listValues[i]}>{listValues[i].toUpperCase()}</option>)
      }
      return(<select value={value} onChange={this.handleChange}>{children}</select>)
    }
    return getSelectList();
  }
}

//todo in separate file
class AmountInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onValueChange(e.target.value);
  }

  render() {
    const amount = this.props.amount;
    const currency = this.props.currency;
    return (
      <div>
        <legend>Amount in {("" + currency).toUpperCase()}:</legend>
        <input value={amount}
          onChange={this.handleChange} />
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleBuySellState = this.handleBuySellState.bind(this);
    this.state = { buySell: 'buy', amount: '1', selectedCurrency: 'usd' };
  }

  handleAmountChange(amount) {
    this.setState({amount });
  }
  handleCurrencyChange(selectedCurrency) {
    this.setState({selectedCurrency});
  }
  handleBuySellState(buySell) {
    
    this.setState({buySell:buySell});
  }

  render() {
    const amount = this.state.amount;
    const cur = this.state.selectedCurrency;  
    const isSell =  this.state.buySell === 'sell';
    const convertedAmount = tryConvert(amount, cur, this.state.buySell === 'sell');
    const inputCurrency = isSell ? this.state.selectedCurrency.toUpperCase() : 'UAH'
    const localCurrency = 'uah';
    return (
      <div>
        <h1 align="center">
          Currency Exchange
        </h1>
        <CurrencyTable currencyList={exchangeRates} />
        <DropDown 
           listValues={Object.keys(exchangeRates)}
           selectedValue={this.state.selectedCurrency}
           onValueSelected={this.handleCurrencyChange}
         />
         <BuySellButton 
          handleClick={this.handleBuySellState}
          param={this.state.buySell}
         />
        <AmountInput
          currency={inputCurrency}
          amount={amount}
          onValueChange={this.handleAmountChange}
        />
        <p>
         Equals: {convertedAmount} {isSell ? localCurrency.toUpperCase() : cur.toUpperCase()}
        </p>
      </div>
    );
  }
}

export default App;