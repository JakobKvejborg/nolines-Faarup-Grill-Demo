// The "store" folder handles data logic (adding/removing items), while CartView.vue is only responsible for displaying the cart

// Javascript
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios"; // Ensure Axios is installed

export const useCartStore = defineStore("cart", () => {
  const products = ref([]); // Store fetched products
  const cartItems = ref([]); // 🛒 Cart should always be an array
  const loading = ref(false);
  const error = ref(null);

  // Fetch products function
  const fetchProducts = async () => {
    if (products.value.length > 0) return; // Prevent unnecessary API calls

    try {
      loading.value = true;
      const response = await axios.get("https://localhost:7070/api/product"); // Replace with your actual API
      products.value = response.data; // Ensure this matches your API response structure
    } catch (err) {
      error.value = "Failed to fetch products";
      console.error("Fetch error:", err);
    } finally {
      loading.value = false;
    }
  };

  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cartItems.value.find((item) => item.productId === product.productId);
    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if item already exists
    } else {
      cartItems.value.push({ ...product, quantity: 1 }); // Add new item with quantity 1
    }
  };

  // Remove item from cart
  const removeFromCart = (product) => {
    const index = cartItems.value.findIndex((item) => item.productId === product.productId);
    if (index !== -1) {
      if (cartItems.value[index].quantity > 1) {
        cartItems.value[index].quantity -= 1; // Reduce quantity
      } else {
        cartItems.value.splice(index, 1); // Remove if quantity is 1
      }
    }
  };

  // Empty the cart
  const emptyCart = () => {
    cartItems.value = [];
  };

  // Computed total items and price
  const totalItems = computed(() => cartItems.value.reduce((sum, item) => sum + item.quantity, 0));
  const totalPrice = computed(() => cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0));

  // Fetch products **immediately** when the store is created
  fetchProducts();

  return {
    products,
    cartItems, // ✅ Always initialized as an array
    loading,
    error,
    fetchProducts,
    addToCart,
    removeFromCart,
    emptyCart,
    totalItems,
    totalPrice,
  };
});
