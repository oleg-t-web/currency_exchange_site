import { ACTIONS } from 'store/actions/loadIndicator';

const initialState = {
  isLoading: false,
  error: null
};
const loaderIndicatorReducer = (state = initialState, action) => {
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
    case ACTIONS.HIDE_ERROR_MESSAGE:
      state = {
        ...state,
        error: null
      };
      break;
  }
  return state;
};

export default loaderIndicatorReducer;
