import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_VALUES } from 'pages/helpers/initialValues';
import { ACTIONS } from 'store/actions/exchanger';

const initialState = { ...INITIAL_VALUES };

export const exchangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.BUY_SELL:
      state = {
        ...state,
        operation: action.value
      };
      break;
    case ACTIONS.PICK_CURRENCY:
      state = {
        ...state,
        currency: action.value
      };
      break;
    case ACTIONS.INPUT_AMOUNT:
      state = {
        ...state,
        amount: action.value
      };
  }

  return state;
};

const exchangerSlice = createSlice({
  name: 'exchanger',
  initialState: {
    ...INITIAL_VALUES
  },
  reducers: {
    buySellAction(state, action) {
      state.operation = action.value;
    },
    inputAmountAction(state, action) {
      state.currency = action.value;
    },
    pickCurrencyAction(state, action) {
      state.amount = action.value;
    }
  }
});

export const { buySellAction, inputAmountAction, pickCurrencyAction } = exchangerSlice.actions;

export default exchangerSlice.reducer;
