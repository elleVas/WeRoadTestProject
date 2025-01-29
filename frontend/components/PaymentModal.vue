<template>
  <div
    v-if="internalValue"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-lg p-6 w-96 shadow-lg">
      <h2 class="text-xl font-bold mb-4">Payment Information</h2>
      <CartTimer :expiryTime="expiryTime" @timeExpired="handleTimeExpired" />
      <form @submit.prevent="handlePayment">
        <div class="mb-4">
          <label
            for="cardNumber"
            class="block text-sm font-medium text-gray-700"
            >Card Number</label
          >
          <input
            id="cardNumber"
            type="text"
            v-model="paymentDetails.cardNumber"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="1234 5678 9012 3456"
          />
          <p v-if="errors.cardNumber" class="text-red-500 text-sm">
            {{ errors.cardNumber }}
          </p>
        </div>

        <div class="mb-4">
          <label
            for="expirationDate"
            class="block text-sm font-medium text-gray-700"
            >Expiration Date</label
          >
          <input
            id="expirationDate"
            type="text"
            v-model="paymentDetails.expirationDate"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="MM/YY"
          />
          <p v-if="errors.expirationDate" class="text-red-500 text-sm">
            {{ errors.expirationDate }}
          </p>
        </div>

        <div class="mb-4">
          <label for="cvv" class="block text-sm font-medium text-gray-700"
            >CVV</label
          >
          <input
            id="cvv"
            type="text"
            v-model="paymentDetails.cvv"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="123"
          />
          <p v-if="errors.cvv" class="text-red-500 text-sm">
            {{ errors.cvv }}
          </p>
        </div>

        <button
          :disabled="isTimeExpired || isLoading"
          type="submit"
          class="w-full bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200"
          v-if="!isLoading"
        >
          Pay ${{ totalPrice }}
        </button>

        <div v-else class="w-full h-12 flex justify-center items-center">
          <svg
            class="animate-spin w-6 h-6 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-opacity="0.2"
            ></circle>
            <path
              d="M4 12a8 8 0 0 1 8-8V4M12 4v4M12 12h4"
              stroke="currentColor"
            ></path>
          </svg>
        </div>
        <span v-if="isTimeExpired" class="text-red-600 text-sm">Tempo scaduto, verrete reindirizzati alla home page</span>
    
      </form>

      <button
        @click="closeModal"
        class="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";
import { CONFIRM_BOOKING } from "@/plugins/graphql/mutations";

const { $apollo } = useNuxtApp();

// Definizione dei tipi per le props
interface Props {
  isOpenPayment: boolean;
  totalPrice: number;
  bookingID: string;
}

// Props ricevute dal componente padre
const props = defineProps<Props>();

// Emitter per eventi al padre
const emits = defineEmits<{
  (event: "update:isOpenPayment", value: boolean): void;
}>();

// Stato interno per gestire la visibilità della modale
const internalValue = ref<boolean>(props.isOpenPayment);
const bookingID = ref<string>(props.bookingID);
const isTimeExpired = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const dialogPayment = ref<boolean>(false);

// Dettagli di pagamento
const paymentDetails = ref<{
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}>({
  cardNumber: "",
  expirationDate: "",
  cvv: "",
});

// Errori di validazione
const errors = ref<{
  cardNumber?: string;
  expirationDate?: string;
  cvv?: string;
}>({});

const expiryTime = ref<Date>(new Date(new Date().getTime() + 15 * 60000));

// Funzione per chiudere la modale
const closeModal = (): void => {
  internalValue.value = false;
  paymentDetails.value = {
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  };
  errors.value = {};
  emits("update:isOpenPayment", false);
};

const handleTimeExpired = (): void => {
  isTimeExpired.value = true;
  setTimeout(() => {
    navigateTo("/");
  }, 5000);
};

// Funzione per validare i campi di pagamento
const validatePaymentDetails = (): boolean => {
  errors.value = {};

  // Valida il numero della carta
  if (!/^\d{16}$/.test(paymentDetails.value.cardNumber)) {
    errors.value.cardNumber = "Card number must be 16 digits.";
  }

  // Valida la data di scadenza
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentDetails.value.expirationDate)) {
    errors.value.expirationDate = "Expiration date must be in MM/YY format.";
  } else {
    const [month, year] = paymentDetails.value.expirationDate.split("/").map(Number);
    const currentDate = new Date();
    const expiryDate = new Date(
      2000 + year,
      month - 1,
      1
    );
    if (expiryDate <= currentDate) {
      errors.value.expirationDate = "Expiration date must be in the future.";
    }
  }

  // Valida il CVV
  if (!/^\d{3}$/.test(paymentDetails.value.cvv)) {
    errors.value.cvv = "CVV must be 3 digits.";
  }

  return Object.keys(errors.value).length === 0;
};

// Funzione per gestire il pagamento
const handlePayment = async (): Promise<void> => {
  if (isTimeExpired.value) {
    return;
  }

  if (!validatePaymentDetails()) {
    console.error("Validation errors:", errors.value);
    return;
  }

  const confirmBookingInput = {
    id: bookingID.value,
    fakeToken: "valid_token",
  };

  // Imposta lo stato di caricamento
  isLoading.value = true;

  try {
    await $apollo.mutate({
      mutation: CONFIRM_BOOKING,
      variables: { confirmBookingInput },
    });

    dialogPayment.value = true;
  } catch (error) {
    console.error("Errore nella creazione della prenotazione:", error);
  } finally {
    isLoading.value = false;
    navigateTo("/bookingConfirmation")
    closeModal();
  }
};

// Sincronizza lo stato interno con la prop ricevuta
watch(
  () => props.isOpenPayment,
  (newVal: boolean) => {
    internalValue.value = newVal;
  }
);
watch(
  () => props.bookingID,
  (id: string) => {
    bookingID.value = id;
  }
);

// Aggiorna la prop quando cambia lo stato interno
watch(internalValue, (newVal: boolean) => {
  emits("update:isOpenPayment", newVal);
});
</script>




