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
// Definisci l'interfaccia per la prop 'travel'
interface Travel {
  name: string;
  description: string;
  price: number;
  maxCapacity: number;
  iata: string;
}

// Dichiara 'travel' come prop con il tipo definito
const props = defineProps<{
  travel: Travel;
}>();

const emit = defineEmits();

// Funzione per gestire la selezione
const onSelectTravel = () => {
  emit('select', props.travel); // Usa props.travel per accedere alla prop 'travel'
};

// Funzione per ottenere il percorso dell'immagine
const getImagePath = (iata: string) => {
  return new URL(`~/assets/images/${iata}.jpg`, import.meta.url).href;
};
</script>












