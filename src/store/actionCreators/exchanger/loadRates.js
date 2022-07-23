import { api as currencyApi } from 'api/currencyApi';
import { ACTIONS } from 'store/actions/exchanger';

import hideLoaderIndicarotAction from '../loaderIndicator/hideLoaderIndicator';
import setErrorMessageAction from '../loaderIndicator/setErrorMessage';
import showLoaderIndicarotAction from '../loaderIndicator/showLoaderIndicator';

import prepareRates from './helpers/prepareRates';

const loadCurrencyAction = () => {
  return async (dispatch) => {
    dispatch(showLoaderIndicarotAction());
    dispatch(setErrorMessageAction(''));
    const rates = await currencyApi
      .getCurrencyRates()
      .then((rates) => {
        console.log('Rates> ', rates);
        return prepareRates(rates);
      })
      .catch((err) => {
        dispatch(setErrorMessageAction(err.message));
      });

    setTimeout(() => {
      dispatch({
        type: ACTIONS.LOAD_CURRENCY,
        value: rates
      });
      dispatch(hideLoaderIndicarotAction());
    }, 2000);
  };
};

export default loadCurrencyAction;
