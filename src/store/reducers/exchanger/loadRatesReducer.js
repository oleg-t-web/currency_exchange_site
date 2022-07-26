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
