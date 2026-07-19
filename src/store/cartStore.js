import { create } from "zustand";

const useCartStore = create((set, get) => ({
  // initial state
  items: [],

  // actions
  clearCart: () => set({ items: [] }),

  // add to cart
  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    });
  },

  // remove from cart
  removeItem: (productId) => {
    set((state) => {
      return {
        items: state.items.filter((item) => item.id !== productId),
      };
    });
  },

  // update quantity
  updateQuantity: (productId, quantity) => {
    set((state) => {
      return {
        items: state.items.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      };
    });
  },

  // total price
  getTotalPrice: () => {
    const items = get().items;
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  // total quantity
  getTotalQuantity: () => {
    const items = get().items;
    return items.reduce((total, item) => total + item.quantity, 0);
  },
}));

export default useCartStore;
