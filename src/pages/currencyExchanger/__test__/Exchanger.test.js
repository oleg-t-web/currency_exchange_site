import { fireEvent, render, screen } from '@testing-library/react';
import CurrencyExchanger from '../CurrencyExchanger';
import { CURRENCY } from '../../../CurrencyConstants';
import userEvent from '@testing-library/user-event';

// test('enable to change amount input', () => {
//   render(<CurrencyExchanger />);
//   const inputElement = screen.getByTestId('amountInput');
//   fireEvent.change(inputElement, { target: { value: '123' } });

//   expect(inputElement.value).toBe('123');
// });

describe('conveertions', () => {
  test('Buy usd conversion', () => {
    render(<CurrencyExchanger />);
    const currency = CURRENCY.USD;
    const coef = 35.55;
    const userInput = 100;
    const expectedOutput = `Equals: ${(userInput / coef).toFixed(2)} ${currency}`;
    const valueInput = screen.getByTestId('amountInput');
    const buyButton = screen.getByRole('radio', { name: 'BUY' });
    //const sellButton = screen.getByRole('radio', { name: 'SELL' });

    userEvent.click(buyButton, { button: 0 });
    fireEvent.change(valueInput, { target: { value: userInput } });
    const resultOutput = screen.getByText(expectedOutput);

    expect(resultOutput).toBeInTheDocument();
  });
});
