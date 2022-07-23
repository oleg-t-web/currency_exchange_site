import { api as currencyApi } from 'api/currencyApi';
import { CURRENCY, OPERATIONS } from 'pages/Exchanger/helpers/CurrencyConstants';
import { ACTIONS } from 'store/actions/exchanger';

import hideLoaderIndicarotAction from '../loaderIndicator/hideLoaderIndicator';
import showLoaderIndicarotAction from '../loaderIndicator/showLoaderIndicator';

const prepareRates = (rates) => {
  const filteredCurrencyList = rates.filter((currencyInfo) =>
    Object.prototype.hasOwnProperty.call(CURRENCY, currencyInfo.cc)
  );
  const preparedRates = {};
  filteredCurrencyList.map((currencyInfo) => {
    preparedRates[currencyInfo.cc] = {
      [OPERATIONS.BUY]: currencyInfo.rate,
      [OPERATIONS.SELL]: (currencyInfo.rate * 1.1).toFixed(4)
    };
  });

  return preparedRates;
};

const loadCurrencyAction = () => {
  return async (dispatch) => {
    dispatch(showLoaderIndicarotAction());
    const rates = await currencyApi
      .getCurrencyRates()
      .then((rates) => {
        console.log('Rates> ', rates);
        return prepareRates(rates);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch({
      type: ACTIONS.LOAD_CURRENCY,
      value: rates
    });
    dispatch(hideLoaderIndicarotAction());
  };
};

export default loadCurrencyAction;
