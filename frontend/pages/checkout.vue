<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Checkout</h1>
    <form @submit.prevent="confirmBooking" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label for="seats" class="block text-sm font-medium">Seats</label>
        <input
          id="seats"
          v-model.number="seats"
          type="number"
          min="1"
          max="travel?.maxCapacity"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <p class="text-sm">Total: {{ seats * travel?.price }}€</p>
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm"
      >
        Confirm and Pay
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gql } from '@apollo/client/core';
import { useNuxtApp, useRoute } from '#app';

const route = useRoute();
const travelId = route.query.travelId;

const email = ref('');
const seats = ref(1);
const travel = ref(null);
const { $apollo } = useNuxtApp();

const FETCH_TRAVEL = gql`
  query GetTravel($id: ID!) {
    travel(id: $id) {
      id
      name
      price
      maxCapacity
    }
  }
`;

const CREATE_BOOKING = gql`
  mutation CreateBooking($input: CreateBookingInput!) {
    createBooking(createBookingInput: $input) {
      id
    }
  }
`;

onMounted(async () => {
  const { data } = await $apollo.query({
    query: FETCH_TRAVEL,
    variables: { id: travelId },
  });
  travel.value = data.travel;
});

const confirmBooking = async () => {
  const input = {
    email: email.value,
    seats: seats.value,
    travelId: travelId,
    paymentStatus: 'PAID', // Fake payment status
  };

  await $apollo.mutate({
    mutation: CREATE_BOOKING,
    variables: { input },
  });

  alert('Booking confirmed!');
  navigateTo('/');
};
</script>
