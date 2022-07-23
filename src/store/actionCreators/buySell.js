import { ACTIONS } from 'store/actions/actions';

const buySellAction = (value) => {
  return {
    type: ACTIONS.BUY_SELL,
    value
  };
};

export default buySellAction;
