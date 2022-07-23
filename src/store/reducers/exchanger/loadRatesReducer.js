import { ACTIONS } from 'store/actions/exchanger';

const initialState = {
  rates: []
};

export const loadRatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_CURRENCY:
      state = {
        ...state,
        rates: action.value
      };
      break;
  }

  return state;
};
