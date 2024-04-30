import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
    id: string;
    name: string;
    photoURL: string;   
    amount: number;
    price: number;
    description: string;
    count: number;
    size: string;
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
            const existingItem = state.cartItems.find(item => item.id === action.payload.id && item.size === action.payload.size);
            if (existingItem) {
                // If the item already exists, increment its count
                existingItem.count += 1;
            } else {
                // If the item doesn't exist, add it to the cart with a count of 1
                action.payload.count = 1;
                state.cartItems.push(action.payload);
            }
        },
        incrementCount: (state, action: PayloadAction<{ id: string; size: string }>) => {
            const item = state.cartItems.find(item => item.id === action.payload.id && item.size === action.payload.size);
            if (item) {
                item.count += 1;
            }
        },
        decrementCount: (state, action: PayloadAction<{ id: string; size: string }>) => {
            const item = state.cartItems.find(item => item.id === action.payload.id && item.size === action.payload.size);
            if (item && item.count > 1) {
                item.count -= 1;
            }
        },
        clearitem: (state, action: PayloadAction<{ id: string; size: string }>) => {
            const index = state.cartItems.findIndex(item => item.id === action.payload.id && item.size === action.payload.size);
            if (index !== -1) {
                state.cartItems.splice(index, 1);
            }
        }
    },
});

export const { addToCart, incrementCount, decrementCount, clearitem } = productItemSlice.actions;
