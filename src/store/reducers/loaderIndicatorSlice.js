import { createSlice } from '@reduxjs/toolkit';

const loaderIndicatorSlice = createSlice({
  name: 'loaderIndicator',
  initialState: {
    isLoading: false,
    error: null
  },
  reducers: {
    showLoaderIndicarotAction(state) {
      state.isLoading = true;
    },
    hideLoaderIndicarotAction(state) {
      state.isLoading = false;
    },
    setErrorMessageAction(state, action) {
      state.error = action.payload;
    }
  }
});

export const { showLoaderIndicarotAction, hideLoaderIndicarotAction, setErrorMessageAction } =
  loaderIndicatorSlice.actions;

export default loaderIndicatorSlice.reducer;
