import { CURRENCY, OPERATIONS } from './CurrencyConstants';

const getExchangeRates = () => {
  const exchangeRates = {
    [CURRENCY.USD]: {
      [OPERATIONS.BUY]: 35.55,
      [OPERATIONS.SELL]: 35.05
    },
    [CURRENCY.EUR]: {
      [OPERATIONS.BUY]: 38.6,
      [OPERATIONS.SELL]: 38.2
    },
    [CURRENCY.GBP]: {
      [OPERATIONS.BUY]: 41.3,
      [OPERATIONS.SELL]: 41.1
    }
  };
  return exchangeRates;
};

getExchangeRates.displayName = 'getExchangeRates';

export default getExchangeRates;
