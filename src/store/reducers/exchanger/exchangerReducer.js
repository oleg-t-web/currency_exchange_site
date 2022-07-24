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
