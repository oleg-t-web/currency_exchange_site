import { ACTIONS } from 'store/actions/loadIndicator';

const setErrorMessageAction = (message) => {
  return {
    type: ACTIONS.SET_ERROR_MESSAGE,
    value: message
  };
};

export default setErrorMessageAction;
