import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransactionHistoryContext } from 'contexts/TransactionHistoryContext';
//import PropTypes from 'prop-types';
import buySellAction from 'store/actionCreators/buySell';
import inputAmountAction from 'store/actionCreators/inputAmount';
import pickCurrencyAction from 'store/actionCreators/pickCurrency';

import { CURRENCY, EXCHANGECURRENCY, OPERATIONS } from './helpers/CurrencyConstants';

const useCurrencyExchanger = (exchangerApi) => {
  const { addTransactionRecord } = useContext(TransactionHistoryContext);
  const [convertedAmount, setConvertedAmount] = useState('');
  const [exchangeRates, setExchangeRates] = useState({});
  const [loadStatus, setLoading] = useState({ completed: false, message: '' });
  const currencyList = useMemo(() => EXCHANGECURRENCY, []);

  const dispatchBuySell = useDispatch();
  const dispatchInputAmount = useDispatch();
  const dispatchCurrencyChange = useDispatch();

  const amount = useSelector((state) => {
    const { input } = state;
    return input.amount;
  });

  const buySell = useSelector((state) => {
    const { operation } = state;
    return operation.buySell;
  });

  const selectedCurrency = useSelector((state) => {
    const { selectedCurrency } = state;
    return selectedCurrency.currency;
  });

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
    dispatchBuySell(buySellAction(operation));
  }, []);

  const onAmountChange = (amount) => {
    console.log('******************Here I am**********************');
    dispatchInputAmount(inputAmountAction(amount));
  };

  const onCurrencyChange = useCallback((selectedCurrency) => {
    dispatchCurrencyChange(pickCurrencyAction(selectedCurrency));
  }, []);

  const onCommit = () => {
    const transaction = {
      operation: buySell,
      currency: selectedCurrency,
      amount: +amount,
      date: new Date().toJSON()
    };
    addTransactionRecord(transaction);
    dispatchInputAmount(inputAmountAction(''));
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
    exchangerApi
      .getCurrencyRates()
      .then((rates) => {
        setExchangeRates(prepareRates(rates));
        changeLoadStatus(true);
      })
      .catch((err) => {
        console.log(err);
        changeLoadStatus(true, 'Service unavailable :( \n');
      });
  }, []);

  useEffect(() => {
    if (loadStatus.completed) {
      const conversionRes = tryConvert(amount, selectedCurrency, isSell, exchangeRates) || '...';

      setConvertedAmount(conversionRes);
    }
  }, [amount, selectedCurrency, buySell]);

  return [
    { buySell, onBuySellChange },
    { amount, onAmountChange },
    { selectedCurrency, onCurrencyChange },
    exchangeRates,
    currencyList,
    convertedAmount,
    onCommit,
    loadStatus
  ];
};

// useCurrencyExchanger.propTypes = {
//   initialValue: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
//   initialCurrency: PropTypes.oneOf(Object.values(CURRENCY)),
//   initialOperation: PropTypes.oneOf(Object.values(OPERATIONS))
// };

export default useCurrencyExchanger;
