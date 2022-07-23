import { ACTIONS } from 'store/actions/loadIndicator';

const initialState = {
  isLoading: false,
  error: null
};
const loaderIndicatorReducer = (state = initialState, action) => {
  console.log('WAITINDICATOR> ', state);
  switch (action.type) {
    case ACTIONS.SHOW_INDICATOR:
      state = {
        ...state,
        isLoading: true
      };
      break;
    case ACTIONS.HIDE_INDICATOR:
      state = {
        ...state,
        isLoading: false
      };
      break;
    case ACTIONS.SET_ERROR_MESSAGE:
      state = {
        ...state,
        error: action.value
      };
      break;
  }
  return state;
};

export default loaderIndicatorReducer;
