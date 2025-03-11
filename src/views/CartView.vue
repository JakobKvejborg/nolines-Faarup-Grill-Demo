<!-- CartView.vue is only responsible for displaying the shopping cart, retrieves and displays data from the store -->

<template>
  <div>
    <appNavbar :restaurantName="restaurantName" /> <!-- Uses the appNavbar component to display the restaurant name at the top -->
    <div class="cart">
      <h2>Indkøbskurven</h2>

      <div v-if="cartItems.length === 0">Kurven er tom</div> <!-- If the cart is empty, do this -->
      <div v-else>
        <div v-for="item in cartItems" :key="item.id" class="cart-item"> <!-- If the cart is not empty, loop through cartItems-->
          <img :src="item.image" :alt="item.name" />
          <div class="cart-details">
            <h3>{{ item.name }}</h3>
            <p>{{ item.price }} kr</p>
            <p>Antal: {{ item.quantity }}</p>
            <button @click="removeFromCart(item)">−</button>
            <button @click="addToCart(item)">+</button>
          </div>
        </div>

        <!-- Pay with MobilePay button -->
        <button class="pay-with-mobilepay-btn" @click="openMobilePay">
          <img src="https://play-lh.googleusercontent.com/NGSk6n-n_xpqG6-TI3U-fYqX7FF-0vC_2EnqOv-nuNZcX598jcQkqmZGueImfSQ3DWU">
          Betal med MobilePay
        </button>

        <p class="total">Antal varer: {{ totalItems }}</p>
        <p class="totalsum">Total: {{ totalPrice }} kr</p>

        <button class="empty-cart-btn" @click="emptyCart">Slet kurv</button>
      </div>
    </div>
  </div>
</template>

<!-- Javascript -->
<script>
import { useCartStore } from "../store/cart";
import { useRestaurantStore } from "../store/restaurant"; // Import restaurant store
import { computed } from "vue";
import AppNavbar from "../components/AppNavbar.vue"; // Import navbar

export default {
  components: { AppNavbar },
  setup() {
    const cartStore = useCartStore();
    const restaurantStore = useRestaurantStore(); // Get the restaurant store
    const restaurantName = computed(() => restaurantStore.selectedRestaurantName || "Ukendt Restaurant"); // Get restaurant name

    const openMobilePay = () => {
      const phoneNumber = "27509823";
      const amount = cartStore.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
      const mobilePayUrl = `mobilepay://send?phone=${phoneNumber}&amount=${amount}&currency=DKK`;
      window.location.href = mobilePayUrl;
    };

    return {
      restaurantName,
      cartItems: computed(() => cartStore.cartItems),
      totalItems: computed(() => cartStore.totalItems),
      totalPrice: computed(() =>
        cartStore.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      ),
      addToCart: cartStore.addToCart,
      removeFromCart: cartStore.removeFromCart,
      emptyCart: cartStore.emptyCart,
      openMobilePay,
    };
  },
};
</script>

<!-- CSS -->
<style>
.cart {
padding: 20px;
text-align: center;
}

.cart-item {
background: white;
padding: 15px;
margin: 10px;
border-radius: 10px;
box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
display: flex;
align-items: center;
justify-content: space-between;
}

.cart-item img {
width: 80px;
border-radius: 8px;
}

.cart-details {
flex-grow: 1;
text-align: left;
padding: 0 10px;
}

.cart-details button { /* + and - btns */
background: rgb(0, 117, 49);
color: white;
border: none;
padding: 5px 10px;
margin: 7px;
cursor: pointer;
border-radius: 5px;
font-size: 30px;
}

.total {
font-weight: bold;
margin-top: 15px;
}

.totalsum {
font-weight: bold;
margin-top: 15px;
}

.empty-cart-btn {
background: rgb(240, 22, 22);
color: white;
border: none;
padding: 9px 19px;
margin-top: 20px;
cursor: pointer;
border-radius: 5px;
font-size: 18px;
}

.empty-cart-btn:hover { /* What should the btn look like when hovered  */
background: darkred;
}

.pay-with-mobilepay-btn {
background-color: rgb(94, 121, 253);
color: white;
border: none;
padding: 10px 20px;
margin-top: 15px;
cursor: pointer;
border-radius: 5px;
font-size: 22px;
}

.pay-with-mobilepay-btn:hover {
background-color: rgb(73, 102, 248);
}

.pay-with-mobilepay-btn img { /* CSS for the img inside the checkout btn */
width: 20px;
height: 16px;
}

</style>
