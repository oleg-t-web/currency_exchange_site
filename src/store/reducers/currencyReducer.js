import { CURRENCY } from 'pages/Exchanger/helpers/CurrencyConstants';

const initialState = {
  currency: CURRENCY.USD
};

export const currencyReducer = (state = initialState, action) => {
  console.log('currencyReducer > ', action);
  return state;
};
