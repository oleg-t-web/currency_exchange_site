const { ACTIONS } = require('store/actions/loadIndicator');

const showLoaderIndicarotAction = () => {
  return {
    type: ACTIONS.SHOW_INDICATOR
  };
};

export default showLoaderIndicarotAction;
