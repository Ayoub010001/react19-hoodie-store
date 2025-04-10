import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

interface CartState {
    items: Product[];
    feedBack: string | null;
}

const initialState: CartState = {
    items: [],
    feedBack: null,
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
                state.feedBack = `${action.payload.name} added to cart`;
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const removedItem= state.items.find(({id}) => id === action.payload);
            state.items = state.items.filter((item) => item.id !== action.payload);
            
            console.log("Payload =>" + action.payload)
            console.log("Removed Item =>" + removedItem)
            if(removedItem) {
                state.feedBack = `${removedItem?.name} removed from cart`;
            }

        },
        clearCart: (state) => {
            state.items = [];
        },
        clearFeedBack: (state) => {
            state.feedBack = '';
        },
    },
});
export const { addToCart, removeFromCart, clearCart, clearFeedBack } = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.items.reduce((total, item) => total + item.price, 0);
export const selectCartItemCount = (state: { cart: CartState }) => state.cart.items.length;
export const selectFeedBack = (state: { cart: CartState }) => state.cart.feedBack;

export default cartSlice.reducer;