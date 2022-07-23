const { ACTIONS } = require('store/actions/loadIndicator');

const hideLoaderIndicarotAction = () => {
  return {
    type: ACTIONS.HIDE_INDICATOR
  };
};

export default hideLoaderIndicarotAction;
