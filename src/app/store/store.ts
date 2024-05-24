import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { productItemSlice } from "../../features/Product/ProductItemSlices";
import Province from "./Province";
import formReducer  from "./ShoppingFormInput";
import CheckoutId from "./checkoutId";
import localStorageMiddleware from "./localStorageMiddleware";
import { authSlice } from "../../features/auth/authSlice";
import { modalSlice } from "../common/modalSlice";

// Load the cart items from localStorage
const savedCartItems = localStorage.getItem('cart');
const savedFormState = localStorage.getItem('formState');
const preloadedState = {
  cartitem: {
    cartItems: savedCartItems ? JSON.parse(savedCartItems) : [],
  },
  shoppingFormState: savedFormState && savedFormState !== "undefined" ? JSON.parse(savedFormState) : {},
};

if (!Array.isArray(preloadedState.cartitem.cartItems)) {
  preloadedState.cartitem.cartItems = [];
}

export const store = configureStore({
  reducer: {
    cartitem: productItemSlice.reducer,
    checkoutId: CheckoutId,
    province: Province,
    shoppingFormState: formReducer, // updated from formState to shoppingFormState
    auth: authSlice.reducer,
    modals: modalSlice.reducer,
  },
  preloadedState, // Use the preloadedState
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()