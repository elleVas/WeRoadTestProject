<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
<img
  class="w-full h-48 object-cover"
  :src="`/images/${travel.iata}.jpg`"
  alt="Travel image"
/>
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ travel.name }}</div>
      <p class="text-gray-700 text-base">
        {{ travel.description }}
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        Price: ${{ travel.price }}
      </span>
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        Max Capacity: {{ travel.maxCapacity }} {{ travel.iata }}
      </span>
      <button
        class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="onSelectTravel"
      >
        Book Now
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Travel } from '../interfaces/interfaces';

// Dichiara 'travel' come prop con il tipo definito
const props = defineProps<{
  travel: Travel;
}>();

const emit = defineEmits();
const router = useRouter();

const onSelectTravel = () => {
  // Passa l'ID del viaggio alla pagina di booking tramite il router
  router.push({ path: '/checkout', query: { travelId: props.travel.id } });
};

// Funzione per ottenere il percorso dell'immagine
const getImagePath = (iata: string) => {
  return new URL(`~/assets/images/${iata}.jpg`, import.meta.url).href;
};
</script>












