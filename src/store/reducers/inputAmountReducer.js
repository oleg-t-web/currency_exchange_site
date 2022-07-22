const initialState = {
  amount: '10'
};

export const inputAmountReducer = (state = initialState, action) => {
  console.log('inputAmountReducer > ', action);
  return state;
};
