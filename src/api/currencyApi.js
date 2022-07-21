import createApi, { INTERFACES } from './apiConnector';
import { BANK_GOV_UA as ENDPOINTS } from './endpoints';

const apiConfig = {
  baseURL: ENDPOINTS.BASE
};

let requestHandler;

const getCurrencyRates = () => {
  return requestHandler
    .get(ENDPOINTS.RATES)
    .then((responce) => responce.data)
    .catch((error) => Promise.reject(error));
};

export const init = () => {
  console.log('Init called');
  requestHandler = createApi(INTERFACES.AXIOS, apiConfig);
};

export const api = {
  getCurrencyRates
};
