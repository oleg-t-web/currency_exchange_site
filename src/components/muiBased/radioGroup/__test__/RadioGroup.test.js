import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { OPERATIONS } from '../../../../pages/ Exchanger/helpers/CurrencyConstants';
import RadioGroup from '../RadioGroup';

test('change operation', () => {
  render(
    <RadioGroup
      currentValue={OPERATIONS.BUY}
      valuesList={OPERATIONS}
      handleValueChange={() => {}}
    />
  );

  const buyButton = screen.getByRole('radio', { name: OPERATIONS.BUY });
  const sellButton = screen.getByRole('radio', { name: OPERATIONS.SELL });

  userEvent.click(buyButton, { button: 0 });
  expect(sellButton.checked).toBe(false);
});
