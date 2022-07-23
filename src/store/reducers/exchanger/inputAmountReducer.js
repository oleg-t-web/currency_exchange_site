import { INITIAL_VALUES } from 'pages/helpers/initialValues';
import { ACTIONS } from 'store/actions/exchanger';

const initialState = {
  amount: INITIAL_VALUES.amount
};

export const inputAmountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.INPUT_AMOUNT:
      state = {
        ...state,
        amount: action.value
      };
  }

  return state;
};
