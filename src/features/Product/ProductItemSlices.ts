import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
    id: string;
    name: string;
    photoURL: string;   
    amount: number;
    price: number;
    description: string;
};

type State = {
    cartItems: CartItem[];
};

const initialState: State = {
    cartItems: [],
};

export const productItemSlice = createSlice({
    name: 'productItem',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.cartItems.push(action.payload);
        },
    },
});

export const { addToCart } = productItemSlice.actions;
