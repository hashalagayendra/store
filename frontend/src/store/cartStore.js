import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cart: [],
  checkoutSuccess: false,

  // Add item to cart
  addToCart: (product) => {
    const cart = get().cart;
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },

  // Remove item from cart
  removeFromCart: (productId) => {
    set({ cart: get().cart.filter((item) => item.id !== productId) });
  },

  // Update quantity
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set({
      cart: get().cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    });
  },

  // Clear cart
  clearCart: () => set({ cart: [] }),

  // Checkout - clear cart and show success
  checkout: () => {
    set({ cart: [], checkoutSuccess: true });
  },

  // Reset checkout success state
  resetCheckoutSuccess: () => set({ checkoutSuccess: false }),

  // Get total items count
  getTotalItems: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },

  // Get total price
  getTotalPrice: () => {
    return get().cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  },
}));

export default useCartStore;
