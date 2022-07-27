import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransactionHistoryContext } from 'contexts/TransactionHistoryContext';
//import buySellAction from 'store/actionCreators/exchanger/buySell';
import {
  buySellAction,
  inputAmountAction,
  pickCurrencyAction
} from 'store/reducers/exchanger/exchangerSlice';
import { loadCurrencyAction } from 'store/reducers/exchanger/loadRatesSlice';
// import inputAmountAction from 'store/actionCreators/exchanger/inputAmount';
// import loadCurrencyAction from 'store/actionCreators/exchanger/loadRates';
// import pickCurrencyAction from 'store/actionCreators/exchanger/pickCurrency';
import { getAmountState, getCurrencyState, getOperationState } from 'store/stateGetters/exchanger';

import { EXCHANGECURRENCY, OPERATIONS } from './helpers/CurrencyConstants';

const useCurrencyExchanger = () => {
  const { addTransactionRecord } = useContext(TransactionHistoryContext);
  const [convertedAmount, setConvertedAmount] = useState('');
  const currencyList = useMemo(() => EXCHANGECURRENCY, []);

  // ------------------------- Maybe combine to custom hook (useExchangerReducer)
  const dispatchAction = useDispatch();
  const amount = useSelector(getAmountState);
  const buySell = useSelector(getOperationState);
  const selectedCurrency = useSelector(getCurrencyState);
  const exchangeRates = useSelector((state) => {
    console.log('*******STATE****>>', state);
    return state.rates.currentRates;
  });
  //-----------------------
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
    dispatchAction(buySellAction(operation));
  }, []);

  const onAmountChange = (amount) => {
    console.log('******************Here I am**********************');
    dispatchAction(inputAmountAction(amount));
  };

  const onCurrencyChange = useCallback((selectedCurrency) => {
    dispatchAction(pickCurrencyAction(selectedCurrency));
  }, []);

  const onCommit = () => {
    const transaction = {
      operation: buySell,
      currency: selectedCurrency,
      amount: +amount,
      date: new Date().toJSON()
    };
    addTransactionRecord(transaction);
    dispatchAction(inputAmountAction(''));
    console.log(JSON.stringify(transaction));
  };

  useEffect(() => {
    dispatchAction(loadCurrencyAction());
  }, []);

  useEffect(() => {
    const isRatesLoaded = !!Object.keys(exchangeRates).length;
    if (isRatesLoaded) {
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
    onCommit
  ];
};

export default useCurrencyExchanger;
