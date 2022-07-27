import { createSlice } from '@reduxjs/toolkit';

const loaderIndicatorSlice = createSlice({
  name: 'loaderIndicator',
  initialState: {
    isLoading: false,
    error: null
  },
  reducers: {
    showLoaderIndicator(state) {
      state.isLoading = true;
    },
    hideLoaderIndicator(state) {
      state.isLoading = false;
    },
    setErrorMessage(state, action) {
      state.error = action.payload;
    }
  }
});

export const { showLoaderIndicator, hideLoaderIndicator, setErrorMessage } =
  loaderIndicatorSlice.actions;

export default loaderIndicatorSlice.reducer;
