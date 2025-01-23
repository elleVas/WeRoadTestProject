<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="max-w-3xl w-full bg-gray-100 rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-center mb-6">Checkout</h1>
          <CartTimer :expiryTime="expiryTime"  @timeExpired="handleTimeExpired"/>

      <form @submit.prevent="confirmBooking" class="space-y-6">
        <div>
          <label for="email" class="block text-lg font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="mt-2 block w-full border-gray-600 rounded-md shadow-sm p-3"
            required
          />
        </div>
        <div>
          <label for="seats" class="block text-lg font-medium text-gray-700">Seats</label>
          <input
            id="seats"
            v-model.number="seats"
            type="number"
            min="1"
            :max="travel?.maxCapacity"
            class="mt-2 block w-full border-gray-600 rounded-md shadow-sm p-3"
            required
          />
        </div>
        <div>
          <p class="text-lg font-semibold text-gray-800">Total: {{ totalPrice }}€</p>
        </div>
        <div class="flex justify-center">
          <button
          :disabled="isTimeExpired"
            type="submit"
            class="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            Confirm and Pay
          </button>
        </div>
      </form>
  
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { gql } from '@apollo/client/core';
import { useNuxtApp, useRoute } from '#app';
import { GET_TRAVEL } from '@/plugins/graphql/queries';
import { CREATE_BOOKING } from '@/plugins/graphql/mutations';
const route = useRoute();
const travelId = route.query.travelId;

const email = ref('');
const expiryTime = ref(new Date(new Date().getTime() + 15 * 60000));
const isTimeExpired = ref(false);
const seats = ref(1);
const totalPrice = ref(0);
const travel = ref(null);
const { $apollo } = useNuxtApp();


onMounted(async () => {
  const { data } = await $apollo.query({
    query: GET_TRAVEL,
    variables: { id: travelId },
  });
  travel.value = data.travel;
  calculateTotalPrice();
});

// Funzione per calcolare il totale
const calculateTotalPrice = () => {
  if (travel.value) {
    totalPrice.value = seats.value * travel.value.price;
  }
};

// Watcher per calcolare il totale ogni volta che cambiano i posti
watch(seats, () => {
  calculateTotalPrice();
});

// Funzione per gestire l'evento quando il tempo scade
const handleTimeExpired = () => {
  isTimeExpired.value = true;
};

const confirmBooking = async () => {
  const input = {
    email: email.value,
    seats: seats.value,
    travelId: travelId,
    paymentStatus: 'PAID'
  };

  await $apollo.mutate({
    mutation: CREATE_BOOKING,
    variables: { input },
  });

  alert('Booking confirmed!');
  navigateTo('/');
};
</script>

