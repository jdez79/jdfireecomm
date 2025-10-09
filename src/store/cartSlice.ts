import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types/types';
import { loadCartFromSessionStorage, saveCartToSessionStorage } from '../utils/sessionStorage';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: loadCartFromSessionStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      saveCartToSessionStorage(state.items);
    },
    
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToSessionStorage(state.items);
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        saveCartToSessionStorage(state.items);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      saveCartToSessionStorage([]);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartItemCount = (state: { cart: CartState }) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);