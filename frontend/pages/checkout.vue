<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="max-w-3xl w-full bg-gray-100 rounded-lg shadow-lg p-8 relative">
      <!-- Pulsante Back -->
      <button
        @click="back"
        class="absolute top-4 left-4 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-7 h-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Titolo -->
      <h1 class="text-3xl font-bold text-center mb-6">Checkout</h1>

      <!-- Immagine e Testo Travel -->
      <div class="flex flex-col items-center mb-6">
        <p class="mt-4 text-base text-gray-600 text-center">
          {{ travel?.description_extended }}
        </p>
        <br />
        <MoodChart :moods="travel?.moods" />
      </div>
      <!-- Form -->
      <form @submit.prevent="confirmBooking" class="space-y-6">
        <div>
          <label for="email" class="block text-lg font-medium text-gray-700"
            >Email</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            class="mt-2 block w-full border-gray-600 rounded-md shadow-sm p-3"
            required
          />
        </div>
        <div>
          <label for="seats" class="block text-lg font-medium text-gray-700"
            >Seats</label
          >
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
          <p class="text-lg font-semibold text-gray-800">
            Total: {{ totalPrice }}€
          </p>
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            Confirm and Pay
          </button>
        </div>
      </form>
    </div>
  </div>

  <PaymentModal
    :isOpenPayment="dialogPayment"
    :totalPrice="totalPrice"
    :bookingID="bookingID"
    @update:isOpenPayment="dialogPayment = $event"
  />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useNuxtApp, useRoute } from "#app";
import { GET_TRAVEL } from "@/plugins/graphql/queries";
import { CREATE_BOOKING } from "@/plugins/graphql/mutations";
import MoodChart from "@/components/MoodsChart.vue";
import PaymentModal from "@/components/PaymentModal.vue";

const route = useRoute();
const travelId = route.query.travelId;
const dialogPayment = ref(false);
const email = ref("");
const bookingID = ref("");

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

const calculateTotalPrice = () => {
  if (travel.value) {
    totalPrice.value = seats.value * travel.value.price;
  }
};

watch(seats, () => {
  calculateTotalPrice();
});

const confirmBooking = async () => {
  const createBookingInput = {
    email: email.value,
    seats: seats.value,
    travelId: travelId,
  };
  try {
    let res = await $apollo.mutate({
      mutation: CREATE_BOOKING,
      variables: { createBookingInput },
    });
    bookingID.value = res.data.createBooking.id;
    dialogPayment.value = true;
  } catch (error) {
    console.error("Errore nella creazione della prenotazione:", error);
  }
};

const back = () => {
  navigateTo("/");
};
</script>
