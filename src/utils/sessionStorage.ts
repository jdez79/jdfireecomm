import type { Product } from '../types/types';

interface CartItem extends Product {
  quantity: number;
}

const CART_STORAGE_KEY = 'shopping_cart';

export const saveCartToSessionStorage = (cart: CartItem[]): void => {
  try {
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to sessionStorage:', error);
  }
};

export const loadCartFromSessionStorage = (): CartItem[] => {
  try {
    const storedCart = sessionStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Error loading cart from sessionStorage:', error);
    return [];
  }
};

export const clearCartFromSessionStorage = (): void => {
  try {
    sessionStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing cart from sessionStorage:', error);
  }
};