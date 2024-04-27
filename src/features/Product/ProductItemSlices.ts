import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
    id: string;
    name: string;
    photoURL: string;   
    amount: number;
    price: number;
    description: string;
    count: number;
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
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                // If the item already exists, increment its count
                existingItem.count += 1;
            } else {
                // If the item doesn't exist, add it to the cart with a count of 1
                action.payload.count = 1;
                state.cartItems.push(action.payload);
            }
        },
    },
});

export const { addToCart } = productItemSlice.actions;
