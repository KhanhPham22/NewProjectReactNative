import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductListParams, CartItem, CartState } from '../TypesCheck/ProductCartTypes'; 

const CartSlide = createSlice({
    name: 'cart',
    initialState: {
        cart: []as ProductListParams[],
        length : 0
    },
    reducers: {
      addToCart: (state: CartItem, action: PayloadAction<ProductListParams>) => {
        const existingItem = state.cart.find((item) => item._id=== action.payload._id);
        if (!existingItem) {
          state.cart.push(action.payload);
        } 
      },
      increaseQuantity: (state:CartItem, action: PayloadAction<ProductListParams>) => {
        const existingItem = state.cart.find(item => item._id === action.payload._id);
        if (!existingItem) {
          state.cart.push(action.payload);
        }
      },
     decreaseQuantity: (state, action: PayloadAction<ProductListParams>) => {
            const existingItem = state.cart.find(item => item._id === action.payload._id);
            if (existingItem && existingItem.quantity && existingItem.quantity > 1) {
                existingItem.quantity--;
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter(item => item._id !== action.payload);
            state.length = state.cart.length;
        },
      clearCart: (state) => {
        state.cart = [];
        state.length = 0;
      }
    }
  })
  
  export const { addToCart,  increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = CartSlide.actions;
  export default CartSlide.reducer;