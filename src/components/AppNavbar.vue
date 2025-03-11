<!-- Top navigation bar -->

<!-- Template is the layout -->
<template>
  <nav class="navbar">
    <h1>{{ restaurantName }}</h1> 
  </nav>
</template>

<!-- Javascript -->
<script>
export default {
  props: {
    restaurantName: {
      type: String,
      required: true
    }
  }
};
</script>

<!-- CSS -->
<style>
.navbar {
  background: rgb(0, 117, 49);
  padding: 1px;
  color: white;
  text-align: center;
  font-size: 20px;
}
</style>

  