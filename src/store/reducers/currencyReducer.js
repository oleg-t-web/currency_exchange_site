import { INITIAL_VALUES } from 'pages/helpers/initialValues';
import { ACTIONS } from 'store/actions/exchanger';

const initialState = {
  currency: INITIAL_VALUES.currency
};

export const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.PICK_CURRENCY:
      state = {
        ...state,
        currency: action.value
      };
      break;
  }

  return state;
};
