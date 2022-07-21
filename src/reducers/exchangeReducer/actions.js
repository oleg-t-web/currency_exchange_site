import { OPERATIONS } from 'pages/ Exchanger/helpers/CurrencyConstants';

export const buy = () => {
  return {
    type: OPERATIONS.BUY
  };
};

export const sell = () => {
  return {
    type: OPERATIONS.SELL
  };
};
