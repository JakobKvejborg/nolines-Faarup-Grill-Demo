<!-- This is the front page of the app -->

<!-- Template is the layout -->
<template> 
    <div class="home-container">
      <h1 class="title">Vælg en Restaurant:</h1>
      <appNavbar :restaurantName="selectedRestaurantName" /> <!-- passes the chosen restaurantName to the AppNavbar -->
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <ul v-else class="restaurant-list">
      <li 
        v-for="restaurant in restaurants" 
        :key="restaurant.id" 
        @click="selectRestaurantAndNavigate(restaurant)" 
        class="restaurant-item"
      >
        {{ restaurant.name }}
      </li>
    </ul>
  </div>
</template>

<!-- Javascript -->
<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRestaurantStore } from "../store/restaurant"; // Import Pinia store

export default {
  setup() {
    const restaurants = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const router = useRouter();
    const restaurantStore = useRestaurantStore(); // Use the store

    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("https://localhost:7070/api/restaurant");
        restaurants.value = response.data.restaurants;
      } catch (err) {
        error.value = "Failed to load restaurants";
        console.error("Fetch error:", err);
      } finally {
        loading.value = false;
      }
    };

    const selectRestaurantAndNavigate = (restaurant) => {
      restaurantStore.setRestaurant(restaurant.name); // Store the restaurant name
      router.push("/menu"); // Navigate to MainMenu.vue
    };

    onMounted(fetchRestaurants);

    return { restaurants, loading, error, selectRestaurantAndNavigate };
  }
};
</script>
  
  <!-- CSS -->
  <style scoped>
  .home-container {
    max-width: 600px;
    margin: 20px auto;
    text-align: center;
  }
  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .restaurant-list {
    list-style: none;
    padding: 0;
  }
  .restaurant-item {
    padding: 10px;
    margin: 10px 0;
    background: #f5f5f5;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s;
    font-size: 20px;
  }
  .restaurant-item:hover {
    background: #ddd;
  }
  </style>