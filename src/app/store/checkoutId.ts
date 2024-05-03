// In your checkoutId slice
import { createSlice } from '@reduxjs/toolkit';

const checkoutIdSlice = createSlice({
  name: 'checkoutId',
  initialState: '',
  reducers: {
    setCheckoutId: (state, action) => action.payload,
  },
});

export const { setCheckoutId } = checkoutIdSlice.actions;

export default checkoutIdSlice.reducer;