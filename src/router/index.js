// This class is responsible for the vue router. It is used to handle the navigation between different pages or views in a SPA (single page application)

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MainMenu from "../components/MainMenu.vue";
import CartView from "../views/CartView.vue";

// This defines an array of routes, where e.g. "/" - the root URL will show the HomeView.vue component
const routes = [
  { path: "/", component: HomeView }, // Home page
  { path: "/menu", component: MainMenu }, // Main menu page
  { path: "/cart", component: CartView }, // Cart page
];

// This creates a router instance 
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; // this exports the router so it can be used in other classes

