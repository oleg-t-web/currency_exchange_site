import axios from 'axios';

export const INTERFACES = {
  FETCH: 'FETCH',
  AXIOS: 'AXIOS'
};

const getAxiosApi = (config) => {
  return axios.create(config);
};

const getFetchApi = (config) => {
  return config;
};

const createApi = (_interface, config) => {
  let apiInterface;
  switch (_interface) {
    case INTERFACES.AXIOS:
      apiInterface = getAxiosApi(config);
      break;
    case INTERFACES.FETCH:
      apiInterface = getFetchApi(config);
      break;
  }
  return apiInterface;
};

export default createApi;
