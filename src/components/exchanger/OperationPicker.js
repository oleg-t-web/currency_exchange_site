import { OPERATIONS } from 'pages/ Exchanger/helpers/CurrencyConstants';

import DropDown from 'components/muiBased/DropDown/DropDown';
import RadioGroup from 'components/muiBased/radioGroup/RadioGroup';

const OperationPicker = ({ currency, currencyList, operation }) => {
  return (
    <div className="currencySelector">
      <DropDown
        selectedValue={currency.selectedCurrency}
        listValues={currencyList}
        handleValueSelected={currency.onCurrencyChange}
      />
      <RadioGroup
        className="buySell"
        currentValue={operation.buySell}
        valuesList={OPERATIONS}
        handleValueChange={operation.onBuySellChange}></RadioGroup>
    </div>
  );
};
export default OperationPicker;
