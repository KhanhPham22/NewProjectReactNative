import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, ProductListParams } from "../TypesCheck/ProductCartTypes";

export const CartSlide = createSlice({
    name: "cart",
    initialState: {
        cart: [] as ProductListParams[],
        length: 0,
    } as CartItem,
    reducers: {
        addToCart: (state: CartItem, action: PayloadAction<ProductListParams>) => {
            if (!Array.isArray(state.cart)) {
                state.cart = [];
            }
            const existingItem = state.cart.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cart.push({ ...action.payload, quantity: 1 });
                state.length = state.cart.length;
            }
        },
        increaseQuantity: (state: CartItem, action: PayloadAction<ProductListParams>) => {
            if (!Array.isArray(state.cart)) return;
            const existingItem = state.cart.find((item) => item._id === action.payload._id);
            if (existingItem && typeof existingItem.quantity !== "undefined") {
                existingItem.quantity++;
            }
        },
        decreaseQuantity: (state: CartItem, action: PayloadAction<ProductListParams>) => {
            if (!Array.isArray(state.cart)) return;
            const getItem = state.cart.find((item) => item._id === action.payload._id);
            if (getItem && typeof getItem.quantity !== "undefined") {
                if (getItem.quantity > 1) {
                    getItem.quantity--;
                } else {
                    state.cart = state.cart.filter((item) => item._id !== action.payload._id);
                    state.length = state.cart.length;
                }
            }
        },
        removeFromCart: (state: CartItem, action: PayloadAction<string>) => {
            if (!Array.isArray(state.cart)) return;
            state.cart = state.cart.filter((item) => item._id !== action.payload);
            state.length = state.cart.length;
        },
        clearCart: (state) => {
            state.cart = [];
            state.length = 0;
        },
    },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = CartSlide.actions;
export default CartSlide.reducer;
