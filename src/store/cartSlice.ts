import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

interface CartState {
    items: Product[];
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (!existingItem) {
                state.items.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.items.reduce((total, item) => total + item.price, 0);
export const selectCartItemCount = (state: { cart: CartState }) => state.cart.items.length;

export default cartSlice.reducer;