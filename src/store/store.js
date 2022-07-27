import { configureStore } from '@reduxjs/toolkit';
//import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';

import exchangerReducer from './reducers/exchanger/exchangerSlice';
import loadRatesReducer from './reducers/exchanger/loadRatesSlice';
import loaderIndicatorReducer from './reducers/loaderIndicatorSlice';
//import { rootReducer } from './reducers/rootReducer';

//export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default configureStore({
  middleware: [thunk],
  reducer: {
    exchanger: exchangerReducer,
    rates: loadRatesReducer,
    loadStatus: loaderIndicatorReducer
  }
});
