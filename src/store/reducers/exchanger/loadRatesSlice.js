import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api as currencyApi } from 'api/currencyApi';
import prepareRates from 'store/actionCreators/exchanger/helpers/prepareRates';

// import {
//   hideLoaderIndicarotAction,
//   setErrorMessageAction,
//   showLoaderIndicarotAction
// } from '../loaderIndicatorSlice';

export const loadCurrencyAction = createAsyncThunk('loadRates/loadCurrencyAction', async () => {
  // dispatch(showLoaderIndicarotAction());
  //dispatch(setErrorMessageAction(''));
  return await currencyApi
    .getCurrencyRates()
    .then((rates) => {
      console.log('Rates> ', rates);
      return prepareRates(rates);
    })
    .catch((err) => {
      console.log('ERR>', err);
      //dispatch(setErrorMessageAction(err.message));
    });
});

const loadRatesSlice = createSlice({
  name: 'loadRates',
  initialState: {
    currentRates: {}
  },
  extraReducers: (builder) => {
    builder.addCase(loadCurrencyAction.fulfilled, (state, action) => {
      console.log('rates payload******22**> ', action);
      state.currentRates = action.payload;
    });
  }
  // reducers: {
  // loadCurrencyAction(state, action) {
  //   console.log('rates payload********> ', action);
  //   state.currentRates = action.payload;
  // }
  // }
});

export default loadRatesSlice.reducer;
