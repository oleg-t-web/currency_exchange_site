import { useCallback, useEffect, useState, useMemo } from 'react';
import { OPERATIONS, CURRENCY } from './CurrencyConstants';
import PropTypes from 'prop-types';
import getExchangeRates from './getExchangeRates';

const useCurrencyExchanger = (initialValue, initialCurrency, initialOperation) => {
  const [buySell, setBuySell] = useState(initialOperation);
  const [amount, setAmount] = useState(initialValue);
  const [selectedCurrency, setSelectedCurrency] = useState(initialCurrency);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState('');

  const exchangeRates = useMemo(getExchangeRates, []);
  const currencyList = useMemo(() => Object.keys(exchangeRates), []);
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

  const onBuySellChange = useCallback((operation) => {
    setBuySell(operation);
  }, []);
  const onAmountChange = (amount) => {
    setAmount(amount);
  };
  const onCurrencyChange = useCallback((selectedCurrency) => {
    setSelectedCurrency(selectedCurrency);
  }, []);
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
  }, [amount, selectedCurrency, buySell]);

  return [
    { buySell, onBuySellChange },
    { amount, onAmountChange },
    { selectedCurrency, onCurrencyChange },
    { transactionHistory },
    // exchangeRates,
    currencyList,
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
  initialValue: PropTypes.string,
  initialCurrency: PropTypes.oneOf(Object.values(CURRENCY)),
  initialOperation: PropTypes.oneOf(Object.values(OPERATIONS))
};

export default useCurrencyExchanger;
