import axios from 'axios';

import { BANK_GOV_UA_ENDPOINTS } from './endpoints';

const apiConfig = {
  baseURL: BANK_GOV_UA_ENDPOINTS.BASE
};

let requestHandler;

const createRequestHandler = (config) => {
  return axios.create(config);
};

const getCurrencyRates = () => {
  return requestHandler
    .get(BANK_GOV_UA_ENDPOINTS.RATES)
    .then((responce) => responce.data)
    .catch((error) => Promise.reject(error));
};

const init = () => {
  requestHandler = createRequestHandler(apiConfig);
};

export const api = {
  getCurrencyRates,
  init
};
