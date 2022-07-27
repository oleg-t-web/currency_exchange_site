import { CURRENCY, OPERATIONS } from 'pages/Exchanger/helpers/CurrencyConstants';
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

export default prepareRates;
