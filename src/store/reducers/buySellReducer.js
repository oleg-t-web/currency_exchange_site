import { OPERATIONS } from 'pages/Exchanger/helpers/CurrencyConstants';

const initialState = {
  buySell: OPERATIONS.SELL
};

export const buySellReducer = (state = initialState, action) => {
  console.log('buySellReducer > ', action);
  return state;
};
