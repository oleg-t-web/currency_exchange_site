import logo from './logo.svg'; 
import './App.css'; 
import React from 'react'; 
 
let exchangeRates = { 
  usd:{ 
    buy:  35.55, 
    sell: 35.05 
  }, 
  eur:{ 
    buy:  38.60, 
    sell: 38.20 
  }, 
  gbr:{ 
    buy:  41.30, 
    sell: 41.10 
  } 
} 
 
 
function tryConvert(amount, currency, isSell) { 
  const input = parseFloat(amount); 
  if (Number.isNaN(input)) { 
    return ''; 
  } 
  let coef = 1; 
   
  coef = isSell ? exchangeRates[currency].sell : exchangeRates[currency].buy 
   
  const output = amount * coef; 
  const rounded = Math.round(output * 1000) / 1000; 
  return rounded.toString(); 
} 
 
// function BoilingVerdict(props) { 
//   if (props.celsius >= 100) { 
//     return <p>The water would boil.</p>; 
//   } 
//   return <p>The water would not boil.</p>; 
// } 
 
function CurrencyTable(props) { 
 
  const propsList = props.currencyList; 
  let GetTable = () => { 
  let table = []; 
  for(let key in propsList) { 
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
    this.handleUahChange = this.handleUahChange.bind(this); 
    this.state = {  buySell: 'buy', uah: '1'}; 
  } 
    
  handleUahChange(uah) { 
    this.setState({buySell: 'buy', uah}); 
  } 
   
  render() { 
   
    let uah = this.state.uah; 
    let cur = 'usd';//this.state.selectedCurrency;  
    let convertedAmount = tryConvert(uah, cur, false); 
   
    return ( 
      <div> 
        <h1 align="center"> 
          Currency Exchange 
        </h1> 
        <CurrencyTable currencyList={exchangeRates}/> 
        <AmountInput 
        currency = "usd" 
        amount = {convertedAmount} 
          /> 
        <AmountInput 
        currency = "uah" 
        amount = {uah} 
        onValueChange={this.handleUahChange} 
          /> 
         
      </div> 
    ); 
  } 
} 
 
 
export default App;