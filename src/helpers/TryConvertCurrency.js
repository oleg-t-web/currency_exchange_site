import { OPERATION } from '../CurrencyConstants';

export function tryConvert(amount, currency, isSell, exchangeRates) {
  const input = parseFloat(+amount);
  if (Number.isNaN(input)) {
    return undefined;
  }

  const coef = isSell
    ? exchangeRates[currency][OPERATION.SELL]
    : exchangeRates[currency][OPERATION.BUY];

  const output = isSell ? amount * coef : amount / coef;
  const rounded = output.toFixed(4);
  return rounded.toString().slice(0, -2);
}
