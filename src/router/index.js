// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MainMenu from "../components/MainMenu.vue";
import CartView from "../views/CartView.vue";

const routes = [
  { path: "/", component: HomeView }, // Home page
  { path: "/menu", component: MainMenu }, // Main menu page
  { path: "/cart", component: CartView }, // Cart page
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

