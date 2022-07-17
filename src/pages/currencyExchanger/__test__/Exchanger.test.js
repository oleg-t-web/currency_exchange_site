import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { INITIAL_VALUES as mockedValues } from '../../helpers/initialValues';
import CurrencyExchanger from '../CurrencyExchanger';
import { CURRENCY, OPERATIONS } from '../helpers/CurrencyConstants';

import { EXCHANGE_RATES as mockedRates } from './testValues';

// test('enable to change amount input', () => {
//   render(<CurrencyExchanger />);
//   const inputElement = screen.getByTestId('amountInput');
//   fireEvent.change(inputElement, { target: { value: '123' } });

//   expect(inputElement.value).toBe('123');
// });

const commitTransactions = (list) => {
  //[{operation, currency, amount}]

  const valueInput = screen.getByTestId('amountInput');
  //const buyButton = screen.getByRole('radio', { name: 'BUY' });
  //const sellButton = screen.getByRole('radio', { name: 'SELL' });
  let commitButton;

  for (let i in list) {
    fireEvent.change(valueInput, { target: { value: list[i].amount } });
    commitButton = screen.getByTestId('commitButton');
    fireEvent.click(commitButton);
  }
};

describe('chech behaviour', () => {
  test('check initial conditions when empty placeholder,  button  and transaction history invisible', () => {
    render(<CurrencyExchanger {...mockedValues} />);
    expect(screen.getByTestId('amountInput').value).toBe('');
    expect(screen.queryByTestId('commitButton')).toBe(null);
    expect(screen.getByText(/Equals: 0.00/i)).toBeInTheDocument();
    expect(screen.queryByTestId('transactionHistory')).toBe(null);
    expect(screen.getByTestId('currencySelector').value).toBe(mockedValues.initialCurrncy);
  });

  test('Buy usd conversion', () => {
    render(<CurrencyExchanger {...mockedValues} />);
    const pickedCurrency = CURRENCY.EUR; //INITIAL_VALUES.initialCurrncy;
    const pickedOperation = OPERATIONS.BUY;
    const coef = mockedRates[pickedCurrency][pickedOperation]; //35.55;
    const userInput = 100;
    const valueInput = screen.getByTestId('amountInput');
    const buyButton = screen.getByRole('radio', { name: pickedOperation });
    //const sellButton = screen.getByRole('radio', { name:  OPERATIONS.SELL });

    fireEvent.change(screen.getByTestId('currencySelector'), { target: { value: pickedCurrency } });

    userEvent.click(buyButton, { button: 0 });
    fireEvent.change(valueInput, { target: { value: userInput } });
    const expectedOutput = `Equals: ${(userInput / coef).toFixed(2)} ${pickedCurrency}`;
    const resultOutput = screen.getByText(expectedOutput);

    expect(resultOutput).toBeInTheDocument();
  });

  test('add transaction record on commit', () => {
    render(<CurrencyExchanger {...mockedValues} />);

    const userInput = [
      { operation: OPERATIONS.SELL, currency: CURRENCY.USD, amount: 100 },
      { operation: OPERATIONS.BUY, currency: CURRENCY.USD, amount: 102 },
      { operation: OPERATIONS.BUY, currency: CURRENCY.USD, amount: 103 }
    ];

    commitTransactions(userInput);
    const transactions = screen.getAllByTestId('transactionRecord');

    expect(transactions.length).toBe(userInput.length);
  });
});
