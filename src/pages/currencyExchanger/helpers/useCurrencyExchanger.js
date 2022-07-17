import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { CURRENCY, EXCHANGECURRENCY, OPERATIONS } from './CurrencyConstants';
import loadExchangeRates, { ENDPOINTS } from './loadExchangeRates';

const useCurrencyExchanger = (initialValue, initialCurrency, initialOperation) => {
  const [buySell, setBuySell] = useState(initialOperation);
  const [amount, setAmount] = useState(initialValue);
  const [selectedCurrency, setSelectedCurrency] = useState(initialCurrency);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState('');
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState({ completed: false, message: '' });
  const currencyList = useMemo(() => EXCHANGECURRENCY, []);
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
  const prepareRates = (rates) => {
    const filteredCurrencyList = rates.filter((currencyInfo) =>
      Object.prototype.hasOwnProperty.call(CURRENCY, currencyInfo.cc)
    );
    const preparedRates = {};
    filteredCurrencyList.map((currencyInfo) => {
      preparedRates[currencyInfo.cc] = {
        [OPERATIONS.BUY]: currencyInfo.rate,
        [OPERATIONS.SELL]: (currencyInfo.rate * 1.1).toFixed(4)
      };
    });

    return preparedRates;
  };

  const changeLoadStatus = (isCompleted, message = '') => {
    setLoading({
      completed: isCompleted,
      message: message
    });
  };

  useEffect(() => {
    loadExchangeRates(ENDPOINTS.BANK_GOV_UA)
      .then((rates) => {
        setExchangeRates(prepareRates(rates));
        changeLoadStatus(false);
      })
      .catch((err) => {
        console.log(err);
        changeLoadStatus(false, 'Service unavailable :( \n');
      });
  }, []);

  useEffect(() => {
    if (loading.completed) {
      let conversionRes = tryConvert(amount, selectedCurrency, isSell, exchangeRates) || '...';
      setConvertedAmount(conversionRes);
    }
  }, [amount, selectedCurrency, buySell]);

  return [
    { buySell, onBuySellChange },
    { amount, onAmountChange },
    { selectedCurrency, onCurrencyChange },
    { transactionHistory },
    exchangeRates,
    currencyList,
    convertedAmount,
    onCommit,
    loading
  ];
};

useCurrencyExchanger.propTypes = {
  initialValue: PropTypes.string,
  initialCurrency: PropTypes.oneOf(Object.values(CURRENCY)),
  initialOperation: PropTypes.oneOf(Object.values(OPERATIONS))
};

export default useCurrencyExchanger;
