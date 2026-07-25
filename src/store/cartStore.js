import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      // initial state
      items: [],

      // actions
      clearCart: () => set({ items: [] }),

      // add to cart
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          console.log("Adding new item to cart:", product); // log added for debugging

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
        set((state) => ({
          items: state.items.flatMap((item) => {
            if (item.id !== productId) return [item];
            const newQuantity = item.quantity + quantity;
            if (newQuantity <= 0) return [];
            return [{ ...item, quantity: newQuantity }];
          }),
        }));
      },

      // total price
      getTotalPrice: () => {
        const items = get().items;
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      // total quantity
      getTotalQuantity: () => {
        const items = get().items;
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage", // key for localStorage
    },
  ),
);

export default useCartStore;
