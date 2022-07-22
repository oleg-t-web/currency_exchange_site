import { combineReducers } from 'redux';

import { buySellReducer } from './buySellReducer';
import { currencyReducer } from './currencyReducer';
import { inputAmountReducer } from './inputAmountReducer';

export const rootReducer = combineReducers({
  operation: buySellReducer,
  selectedCurrency: currencyReducer,
  input: inputAmountReducer
});
