import { ACTIONS } from 'store/actions/actions';

const pickCurrencyAction = (value) => {
  return {
    type: ACTIONS.PICK_CURRENCY,
    value
  };
};

export default pickCurrencyAction;
