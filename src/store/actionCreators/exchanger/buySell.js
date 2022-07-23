import { ACTIONS } from 'store/actions/exchanger';

const buySellAction = (value) => {
  return {
    type: ACTIONS.BUY_SELL,
    value
  };
};

export default buySellAction;
