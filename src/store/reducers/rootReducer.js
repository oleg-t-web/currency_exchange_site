import { combineReducers } from 'redux';

import { buySellReducer } from './exchanger/buySellReducer';
import { currencyReducer } from './exchanger/currencyReducer';
import { inputAmountReducer } from './exchanger/inputAmountReducer';
import { loadRatesReducer } from './exchanger/loadRatesReducer';
import loaderIndicatorReducer from './loaderIndicatorReducer';

export const rootReducer = combineReducers({
  operation: buySellReducer,
  selectedCurrency: currencyReducer,
  input: inputAmountReducer,
  exchange: loadRatesReducer,
  loadStatus: loaderIndicatorReducer
});
