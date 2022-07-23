import { ACTIONS } from 'store/actions/exchanger';

const inputAmountAction = (value) => {
  return {
    type: ACTIONS.INPUT_AMOUNT,
    value
  };
};
export default inputAmountAction;
