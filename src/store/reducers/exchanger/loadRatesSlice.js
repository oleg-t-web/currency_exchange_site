import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api as currencyApi } from 'api/currencyApi';
import prepareRates from 'store/reducers/exchanger/helpers/prepareRates';

import { hideLoaderIndicator, setErrorMessage, showLoaderIndicator } from '../loaderIndicatorSlice';

export const loadCurrencyAction = createAsyncThunk(
  'loadRates/loadCurrencyAction',
  async (_, thunkApi) => {
    const dispatch = thunkApi.dispatch;
    dispatch(showLoaderIndicator());
    return currencyApi
      .getCurrencyRates()
      .then((rates) => {
        const preparedRates = prepareRates(rates);
        dispatch(hideLoaderIndicator());
        return preparedRates;
      })
      .catch((err) => {
        console.log('ERR>', err);
        dispatch(setErrorMessage(err.message));
        dispatch(hideLoaderIndicator());
      });
  }
);

const loadRatesSlice = createSlice({
  name: 'loadRates',
  initialState: {
    currentRates: {}
  },
  extraReducers: (builder) => {
    builder.addCase(loadCurrencyAction.fulfilled, (state, action) => {
      state.currentRates = action.payload;
    });
  }
});

export default loadRatesSlice.reducer;
