import { fireEvent, getAllByRole, getAllByTestId, render, screen } from '@testing-library/react';
import CurrencyExchanger from '../CurrencyExchanger';
import { CURRENCY, OPERATIONS } from '../../../CurrencyConstants';
import userEvent from '@testing-library/user-event';

// test('enable to change amount input', () => {
//   render(<CurrencyExchanger />);
//   const inputElement = screen.getByTestId('amountInput');
//   fireEvent.change(inputElement, { target: { value: '123' } });

//   expect(inputElement.value).toBe('123');
// });

describe('initial render', () => {
  test('check initial conditions when empty placeholder button invisible', () => {
    render(<CurrencyExchanger />);
    expect(screen.getByTestId('amountInput').value).toBe('');
    expect(screen.queryByTestId('commitButton')).toBe(null);
    expect(screen.getByText(/Equals: 0.00/i)).toBeInTheDocument();
    expect(screen.queryByTestId('transactionHistory')).toBe(null);
  });
});

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

describe('conveertions', () => {
  test('Buy usd conversion', () => {
    render(<CurrencyExchanger />);
    const currency = CURRENCY.USD;
    const coef = 35.55;
    const userInput = 100;
    const valueInput = screen.getByTestId('amountInput');
    const buyButton = screen.getByRole('radio', { name: OPERATIONS.BUY });
    //const sellButton = screen.getByRole('radio', { name:  OPERATIONS.SELL });

    userEvent.click(buyButton, { button: 0 });
    fireEvent.change(valueInput, { target: { value: userInput } });
    const expectedOutput = `Equals: ${(userInput / coef).toFixed(2)} ${currency}`;
    const resultOutput = screen.getByText(expectedOutput);

    expect(resultOutput).toBeInTheDocument();
  });
});

describe('transaction', () => {
  test('add transaction record on commit', () => {
    render(<CurrencyExchanger />);

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
