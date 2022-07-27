import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import exchangerReducer from './reducers/exchanger/exchangerSlice';
import loadRatesReducer from './reducers/exchanger/loadRatesSlice';
import loaderIndicatorReducer from './reducers/loaderIndicatorSlice';

export default configureStore({
  middleware: [thunk],
  reducer: {
    exchanger: exchangerReducer,
    rates: loadRatesReducer,
    loadStatus: loaderIndicatorReducer
  }
});
