import { useEffect, useState } from 'react';
import { OPERATIONS, CURRENCY } from '../../CurrencyConstants';
import PropTypes from 'prop-types';

const useCurrencyExchanger = (inputValue, currency, exchangeRates) => {
  const [buySell, setBuySell] = useState(OPERATIONS.BUY);
  const [amount, setAmount] = useState(inputValue);
  const [selectedCurrency, setSelectedCurrency] = useState(currency);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState('');

  const isSell = buySell === OPERATIONS.SELL;

  const tryConvert = (amount, currency, isSell, exchangeRates) => {
    const input = parseFloat(Number(amount));
    if (Number.isNaN(input)) {
      return undefined;
    }
    const coef = isSell
      ? exchangeRates[currency][OPERATIONS.SELL]
      : exchangeRates[currency][OPERATIONS.BUY];

    const output = isSell ? amount * coef : amount / coef;
    const rounded = output.toFixed(4);
    return rounded.toString().slice(0, -2);
  };

  const onBuySellChange = (operation) => {
    setBuySell(operation);
  };
  const onAmountChange = (amount) => {
    setAmount(amount);
  };
  const onCurrencyChange = (selectedCurrency) => {
    setSelectedCurrency(selectedCurrency);
  };
  const onCommit = () => {
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

  useEffect(() => {
    let conversionRes = tryConvert(amount, selectedCurrency, isSell, exchangeRates) || '...';
    setConvertedAmount(conversionRes);
  });

  return [
    { buySell, onBuySellChange },
    { amount, onAmountChange },
    { selectedCurrency, onCurrencyChange },
    { transactionHistory },
    convertedAmount,
    onCommit
  ];

  // return {
  //   operation: { buySell, onBuySellChange },
  //   input: { amount, onAmountChange },
  //   currency: { selectedCurrency, onCurrencyChange },
  //   history: { transactionHistory },
  //   convertedAmount,
  //   onCommit
  // };
};

useCurrencyExchanger.propTypes = {
  inputValue: PropTypes.string.isRequired,
  currency: PropTypes.oneOf(Object.values(CURRENCY)).isRequired,
  exchangeRates: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default useCurrencyExchanger;
