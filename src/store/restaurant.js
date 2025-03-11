import { defineStore } from "pinia";
import { ref } from "vue";

export const useRestaurantStore = defineStore("restaurant", () => {
  const selectedRestaurantName = ref(localStorage.getItem("restaurantName") || "Ukendt Restaurant");

  const setRestaurant = (name) => {
    selectedRestaurantName.value = name;
    localStorage.setItem("restaurantName", name); // Save to localStorage
  };

  return { selectedRestaurantName, setRestaurant };
});
