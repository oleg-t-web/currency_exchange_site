import { combineReducers } from 'redux';

import { exchangeReducer } from './exchanger/exchangerReducer';
import { loadRatesReducer } from './exchanger/loadRatesReducer';
import loaderIndicatorReducer from './loaderIndicatorReducer';

export const rootReducer = combineReducers({
  exchanger: exchangeReducer,
  rates: loadRatesReducer,
  loadStatus: loaderIndicatorReducer
});
