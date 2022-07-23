import { combineReducers } from 'redux';

import { buySellReducer } from './buySellReducer';
import { currencyReducer } from './currencyReducer';
import { inputAmountReducer } from './inputAmountReducer';
import loaderIndicatorReducer from './loaderIndicatorReducer';
import { loadRatesReducer } from './loadRatesReducer';

export const rootReducer = combineReducers({
  operation: buySellReducer,
  selectedCurrency: currencyReducer,
  input: inputAmountReducer,
  exchange: loadRatesReducer,
  loadStatus: loaderIndicatorReducer
});
