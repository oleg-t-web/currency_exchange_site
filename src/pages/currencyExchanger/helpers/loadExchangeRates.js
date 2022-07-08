const loadExchangeRates = (url) => {
  return fetch(url) // return this promise
    .then((response) => response.json())
    .then((json) => json);
};

export const ENDPOINTS = {
  BANK_GOV_UA: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json'
};

export default loadExchangeRates;
