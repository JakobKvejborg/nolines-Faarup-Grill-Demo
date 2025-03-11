// The "store" folder handles data logic (adding/removing items), while CartView.vue is only responsible for displaying the cart. 

// JAVASCRIPT
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: []
  }),
  getters: {
    totalItems: (state) => state.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  },
  actions: {
    addToCart(item) {
      const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity instead of adding duplicate
      } else {
        this.cartItems.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(item) {
      const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
      if (index !== -1) {
        if (this.cartItems[index].quantity > 1) {
          this.cartItems[index].quantity -= 1;
        } else {
          this.cartItems.splice(index, 1);
        }
      }
    },
    emptyCart() { 
      this.$reset();    
    }
  }
});
