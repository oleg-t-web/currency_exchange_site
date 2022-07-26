import { createSlice } from '@reduxjs/toolkit';
import { ACTIONS } from 'store/actions/exchanger';

const initialState = {
  currentRates: {}
};

export const loadRatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_CURRENCY:
      state = {
        ...state,
        currentRates: action.value
      };
      break;
  }

  return state;
};

const loadRatesSlice = createSlice({
  name: 'loadRates',
  initialState: {
    currentRates: {}
  },
  reducers: {
    loadCurrencyAction(state, action) {
      state.currentRates = action.value;
    }
  }
});

export const { loadCurrencyAction } = loadRatesSlice.actions;

export default loadRatesSlice.reducer;
