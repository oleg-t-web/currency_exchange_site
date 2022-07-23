import { ACTIONS } from 'store/actions/exchanger';

const pickCurrencyAction = (value) => {
  return {
    type: ACTIONS.PICK_CURRENCY,
    value
  };
};

export default pickCurrencyAction;
