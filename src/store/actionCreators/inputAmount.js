import { ACTIONS } from 'store/actions/actions';

const inputAmountAction = (value) => {
  return {
    type: ACTIONS.INPUT_AMOUNT,
    value
  };
};
export default inputAmountAction;
