import { fireEvent, render, screen } from '@testing-library/react';
import CurrencyExchanger from '../CurrencyExchanger';
//import { TextField } from '@mui/material';

test('renders learn react link', () => {
  render(<CurrencyExchanger />);
  const inputElement = screen.getByTestId('amountInput');
  fireEvent.change(inputElement, { target: { value: '123' } });

  expect(inputElement.value).toBe('123');
});
