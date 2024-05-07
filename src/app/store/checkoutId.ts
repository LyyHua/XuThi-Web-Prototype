// In your checkoutId slice
import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const checkoutIdSlice = createSlice({
  name: 'checkoutId',
  initialState: '',
  reducers: {
    setCheckoutId: (_, action) => action.payload,
    resetCheckoutId: () => initialState,
  },
});

export const { setCheckoutId, resetCheckoutId } = checkoutIdSlice.actions;

export default checkoutIdSlice.reducer;