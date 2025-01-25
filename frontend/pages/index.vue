<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-center mb-6">WeRoad takes you to discover the world.</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <TravelCard
        v-for="travel in travels"
        :key="travel.id"
        :travel="travel"
        @book="goToCheckout"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import { GET_TRAVELS } from '@/plugins/graphql/queries';

const travels = ref([]);
onMounted(async () => {
  const { $apollo } = useNuxtApp();
  if ($apollo) {
    const { data } = await $apollo.query({ query: GET_TRAVELS });
    travels.value = data.travels;
  } else {
    console.error('$apollo non è definito!');
  }
});
</script>


