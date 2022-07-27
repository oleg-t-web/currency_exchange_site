import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_VALUES } from 'pages/helpers/initialValues';

const exchangerSlice = createSlice({
  name: 'exchanger',
  initialState: {
    ...INITIAL_VALUES
  },
  reducers: {
    buySell(state, action) {
      state.operation = action.payload;
    },
    inputAmount(state, action) {
      state.amount = action.payload;
    },
    pickCurrency(state, action) {
      state.currency = action.payload;
    }
  }
});

export const { buySell, inputAmount, pickCurrency } = exchangerSlice.actions;

export default exchangerSlice.reducer;
