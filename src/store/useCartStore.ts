import { create } from 'zustand';

interface CartState {
  cart: Record<string, number>;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: {},
  increment: (id) => set((state) => ({
    cart: { ...state.cart, [id]: (state.cart[id] || 0) + 1 }
  })),
  decrement: (id) => set((state) => ({
    cart: { ...state.cart, [id]: Math.max(0, (state.cart[id] || 0) - 1) }
  })),
  clear: () => set({ cart: {} }),
}));
