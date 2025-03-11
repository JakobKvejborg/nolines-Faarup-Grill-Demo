<!-- The page for the products -->

<!-- Template is the layout -->
<template>
  <div>
    <appNavbar :restaurantName="restaurantName" />
    <div class="menu">
      <h2>Menu</h2>
      <div 
        v-for="item in menuItems" 
        :key="item.id" 
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
import { useRestaurantStore } from "../store/restaurant"; // Import Pinia store
import { useCartStore } from "../store/cart";
import { defineComponent } from "vue";
import AppNavbar from "../components/AppNavbar.vue"; 

export default defineComponent({
  components: { AppNavbar },
  setup() {
    const restaurantStore = useRestaurantStore(); 
    const restaurantName = restaurantStore.selectedRestaurantName || "Ukendt Restaurant"; // Get from store

    const cartStore = useCartStore();
    const addToCart = (item) => {
      cartStore.addToCart(item);
    };

    return { addToCart, restaurantName };
  },
  data() {
    return {
      menuItems: [
        { id: 1, name: "Fønix Burger", price: 94, image: "https://www.faarupsommerland.dk/media/g14mhwmv/foenix-burger.jpg?rmode=crop&width=540&height=720&format=webp" },
        { id: 2, name: "Fårup Burger", price: 84, image: "https://www.faarupsommerland.dk/media/fzdkozbn/burger.jpg?rmode=crop&width=540&height=720&format=webp" },
        { id: 3, name: "Orkanen Burger", price: 96, image: "https://www.faarupsommerland.dk/media/gprlq5eh/orkanen-burger-2020.jpg?rmode=crop&width=540&height=720&format=webp" }
      ]
    };
  }
});
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
  