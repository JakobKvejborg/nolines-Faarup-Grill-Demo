<template>
    <AppNavbar />  
    <router-view></router-view> <!-- Renders different pages -->
    <AppFooter />  
</template>

<script>
import AppNavbar from "./components/AppNavbar.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  components: { AppNavbar, AppFooter }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  max-width: 400px;
  margin: auto;
  background-color: #f8f8f8;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding-bottom: 80px; /* Prevent footer from blocking content */
}
</style>
