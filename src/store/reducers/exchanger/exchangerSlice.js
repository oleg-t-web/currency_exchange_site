import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_VALUES } from 'pages/helpers/initialValues';

const exchangerSlice = createSlice({
  name: 'exchanger',
  initialState: {
    ...INITIAL_VALUES
  },
  reducers: {
    buySellAction(state, action) {
      state.operation = action.payload;
    },
    inputAmountAction(state, action) {
      console.log('*****--*>>>>>', state.amount);
      console.log('Action> ', action);
      state.amount = action.payload;
    },
    pickCurrencyAction(state, action) {
      state.currency = action.payload;
    }
  }
});

export const { buySellAction, inputAmountAction, pickCurrencyAction } = exchangerSlice.actions;

export default exchangerSlice.reducer;
