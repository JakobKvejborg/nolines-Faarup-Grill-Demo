<!-- The page for the products -->

<!-- Template is the layout -->
<template>
  <div>
    <appNavbar :restaurantName="restaurantName" />

    <div class="menu">
      <h2>Menu</h2>
      <p v-if="loading">Loading products...</p>
      <p v-if="error" class="error">{{ error }}</p>

      <div 
        v-for="item in products" 
        :key="item.productId" 
        class="menu-item" 
        @click="addToCart(item)"
      >
        <img :src="item.image" :alt="item.name" />
        <h3>{{ item.name }}</h3>
        <p>{{ item.price }} kr</p>
      </div>
    </div>
  </div>
</template>

<!-- Javascript -->
<script>
import { useCartStore } from "../store/cart";
import { useRestaurantStore } from "../store/restaurant"; // ✅ Import the missing store
import { computed, onMounted } from "vue";
import appNavbar from "../components/AppNavbar.vue";

export default {
  components: { appNavbar },
  setup() {
    const cartStore = useCartStore();
    const restaurantStore = useRestaurantStore(); // ✅ Define it properly

    onMounted(() => {
      cartStore.fetchProducts();
    });

    return {
      restaurantName: computed(() => restaurantStore.selectedRestaurantName || "Ukendt Restaurant"), // ✅ Use correct store
      products: computed(() => cartStore.products),
      loading: computed(() => cartStore.loading),
      error: computed(() => cartStore.error),
      addToCart: cartStore.addToCart,
    };
  },
};
</script>

  <!-- CSS -->
  <style>
  .menu {
    padding: 20px;
  }
  .menu-item {
    background: white;
    padding: 15px;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.1s ease-in-out;
  }
  .menu-item:hover {
    transform: scale(1.02);
  }
  .menu-item img {
    max-width: 240px;
    max-height: 250px; /* Prevents the image from being too tall */
  }
  
  </style>
  