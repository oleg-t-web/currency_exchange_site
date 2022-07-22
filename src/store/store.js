import { legacy_createStore as createStore } from 'redux';

import { rootReducer } from './reducers/rootReducer';

// const initialState = {
//   amount: '0',
//   operation: OPERATIONS.SELL,
//   currency: CURRENCY.GBP
// };

// const reducer = (state = initialState, action) => {
//   console.log('reducer > ', action);

//   return state;
// };

const store = createStore(rootReducer);
export default store;
