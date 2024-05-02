import { createSelector } from '@reduxjs/toolkit';

export const selectAreAllItemsChecked = createSelector(
  (state) => state.cartitem.cartItems,
  (cartItems) => cartItems.every((item: any) => item.checked)
);