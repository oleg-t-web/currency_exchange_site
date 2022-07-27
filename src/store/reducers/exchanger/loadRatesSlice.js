//import { useDispatch } from 'react-redux';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api as currencyApi } from 'api/currencyApi';
import prepareRates from 'store/actionCreators/exchanger/helpers/prepareRates';

import {
  hideLoaderIndicarotAction,
  setErrorMessageAction,
  showLoaderIndicarotAction
} from '../loaderIndicatorSlice';

export const loadCurrencyAction = createAsyncThunk(
  'loadRates/loadCurrencyAction',
  async (_, thunkApi) => {
    const dispatch = thunkApi.dispatch;
    dispatch(showLoaderIndicarotAction());
    return currencyApi
      .getCurrencyRates()
      .then((rates) => {
        const preparedRates = prepareRates(rates);
        dispatch(hideLoaderIndicarotAction());
        return preparedRates;
      })
      .catch((err) => {
        console.log('ERR>', err);
        dispatch(setErrorMessageAction(err.message));
        dispatch(hideLoaderIndicarotAction());
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
      console.log('rates payload******22**> ', action);
      state.currentRates = action.payload;
    });
  }
});

export default loadRatesSlice.reducer;
