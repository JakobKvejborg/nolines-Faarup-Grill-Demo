// This file creates and manages the restaurant selection state using Pinia (vue state manangement library). Ensures that the selected restaurant name is stored and can be accessed from different components in the app.

import { defineStore } from "pinia"; // creates a pinia store
import { ref } from "vue"; // creates a reactive state variable

export const useRestaurantStore = defineStore("restaurant", () => {
  const selectedRestaurantName = ref(localStorage.getItem("restaurantName") || "Ukendt Restaurant");

  const setRestaurant = (name) => {
    selectedRestaurantName.value = name;
    localStorage.setItem("restaurantName", name); // Save to localStorage
  };

  return { selectedRestaurantName, setRestaurant };
});
