<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-center mb-6">
      WeRoad takes you to discover the world.
    </h1>
    <div v-if="pending" class="text-center text-gray-600">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500">Error loading travels.</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <TravelCard
        v-for="travel in travels"
        :key="travel.id"
        :travel="travel"
        @book="goToCheckout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData, useNuxtApp } from '#app';
import { GET_TRAVELS } from '@/plugins/graphql/queries';
import { Travel } from '../interfaces/interfaces';

const { $apollo } = useNuxtApp();

const { data: travels, pending, error } = useAsyncData('travels', async () => {
  const { data } = await $apollo.query<{ travels: Travel[] }>({
    query: GET_TRAVELS,
    // Forza il recupero sempre dal server
    fetchPolicy: 'network-only', 
  });
  return data.travels;
});

// Funzione per gestire l'evento di prenotazione
const goToCheckout = (travel: Travel): void => {
  console.log('Prenotazione per il viaggio:', travel);
};
</script>


