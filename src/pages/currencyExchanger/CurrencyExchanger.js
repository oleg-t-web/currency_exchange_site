import './styles/exchanger.css';
import React from 'react';
import { OPERATIONS, CURRENCY } from '../../CurrencyConstants';
import { Box, Button, TextField } from '@mui/material';
import Table from '../../components/muiBased/table/Table';
import DropDown from '../../components/muiBased/dropDown/DropDown';
import RadioGroup from '../../components/muiBased/radioGroup/RadioGroup';
import TransactionHistoryList from '../../components/muiBased/TransactionHistoryList';
import useCurrencyExchanger from './useCurrencyExchanger';

const exchangeRates = {
  [CURRENCY.USD]: {
    [OPERATIONS.BUY]: 35.55,
    [OPERATIONS.SELL]: 35.05
  },
  [CURRENCY.EUR]: {
    [OPERATIONS.BUY]: 38.6,
    [OPERATIONS.SELL]: 38.2
  },
  [CURRENCY.GBR]: {
    [OPERATIONS.BUY]: 41.3,
    [OPERATIONS.SELL]: 41.1
  }
};
const currencyList = Object.keys(exchangeRates);

function CurrencyExchanger() {
  //const exchanger = useCurrencyExchanger('1', CURRENCY.USD, exchangeRates);

  const [operation, inputVal, currency, history, convertedAmount, onCommit] = useCurrencyExchanger(
    '1',
    CURRENCY.USD,
    exchangeRates
  );

  const isSell = operation.buySell === OPERATIONS.SELL;
  const inputCurrency = isSell ? currency.selectedCurrency.toUpperCase() : CURRENCY.UAH;
  const localCurrency = CURRENCY.UAH;
  const inputValueCaption = `Amount in ${('' + inputCurrency).toUpperCase()}:`;
  const currencyTableHeader = ['Currency', 'Buy', 'Sell'];
  const currencyTableColumnNames = [OPERATIONS.BUY, OPERATIONS.SELL];
  const convertionResStr = `Equals: ${convertedAmount} ${
    isSell ? localCurrency.toUpperCase() : currency.selectedCurrency
  }`;
  const commitEnabled = Number(convertedAmount) > 0;
  const transactionHistoryList = history.transactionHistory.slice().reverse();

  return (
    <div>
      <Box className="transactionHistoryList">
        <TransactionHistoryList values={transactionHistoryList}></TransactionHistoryList>
      </Box>
      <Table
        header={currencyTableHeader}
        body={exchangeRates}
        columnNames={currencyTableColumnNames}
      />
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
      <Box className="inputField">
        <TextField
          label={inputValueCaption}
          value={inputVal.amount}
          variant="standard"
          onChange={(e) => {
            inputVal.onAmountChange(e.target.value);
          }}
          size="small"
        />
      </Box>
      <p> {convertionResStr}</p>
      <Box className="commitButtton">
        {commitEnabled && (
          <Button onClick={onCommit} variant="outlined">
            Commit
          </Button>
        )}
      </Box>
    </div>
  );
}

export default CurrencyExchanger;
