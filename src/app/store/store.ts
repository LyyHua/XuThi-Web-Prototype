import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { productItemSlice } from "../../features/Product/ProductItemSlices";
import localStorageMiddleware from "./localStorageMiddleware";
import checkoutId from "./checkoutId";

// Load the cart items from localStorage
const savedCartItems = localStorage.getItem('cart');
const preloadedState = {
  cartitem: {
    cartItems: savedCartItems ? JSON.parse(savedCartItems) : [],
  },
};

if (!Array.isArray(preloadedState.cartitem.cartItems)) {
  preloadedState.cartitem.cartItems = [];
}

export const store = configureStore({
  reducer: {
    cartitem: productItemSlice.reducer,
    checkoutId: checkoutId,
  },
  preloadedState, // Use the preloadedState
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()