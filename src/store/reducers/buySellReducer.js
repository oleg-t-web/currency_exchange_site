import { INITIAL_VALUES } from 'pages/helpers/initialValues';
import { ACTIONS } from 'store/actions/exchanger';

const initialState = {
  buySell: INITIAL_VALUES.operation
};

export const buySellReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.BUY_SELL:
      state = {
        ...state,
        buySell: action.value
      };
      break;
  }

  return state;
};
