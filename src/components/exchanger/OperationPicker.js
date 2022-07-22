import React from 'react';
import { OPERATIONS } from 'pages/Exchanger/helpers/CurrencyConstants';
import PropTypes from 'prop-types';

import DropDown from 'components/muiBased/DropDown/DropDown';
import RadioGroup from 'components/muiBased/RadioGroup/RadioGroup';

const OperationPicker = React.memo(
  ({ selectedCurrency, onCurrencyChange, currencyList, buySell, onBuySellChange }) => {
    return (
      <div className="currencySelector">
        <DropDown
          selectedValue={selectedCurrency}
          listValues={currencyList}
          handleValueSelected={onCurrencyChange}
        />
        <RadioGroup
          className="buySell"
          currentValue={buySell}
          valuesList={OPERATIONS}
          handleValueChange={onBuySellChange}
        />
      </div>
    );
  }
);

OperationPicker.propTypes = {
  selectedCurrency: PropTypes.string,
  onCurrencyChange: PropTypes.func,
  currencyList: PropTypes.array,
  buySell: PropTypes.string,
  onBuySellChange: PropTypes.func
};
OperationPicker.displayName = 'OperationPicker';
OperationPicker.whyDidYouRender = true;

export default OperationPicker;
