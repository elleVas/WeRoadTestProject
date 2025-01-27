<template>
  <div class="flex flex-wrap gap-8 items-center justify-center">
    <div
      v-for="mood in moodsArray"
      :key="mood.label"
      class="flex flex-col items-center w-1/3 sm:w-1/4 md:w-1/6"
    >
      <div class="relative w-16 h-16 sm:w-20 sm:h-20">
        <!-- Cerchio sfondo -->
        <svg class="w-full h-full" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="#E5E7EB"
            fill="none"
            stroke-width="4"
          ></circle>
          <circle
            cx="18"
            cy="18"
            r="16"
            :stroke="mood.color"
            fill="none"
            stroke-width="4"
            stroke-dasharray="100"
            :stroke-dashoffset="100 - mood.value"
            stroke-linecap="round"
            transform="rotate(-90 18 18)"
          ></circle>
        </svg>
        <!-- Icona al centro -->
        <div class="absolute inset-0 flex items-center justify-center">
          <img :src="mood.icon" alt="Mood Icon" class="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
      </div>
      <!-- Etichetta -->
      <p class="text-xs sm:text-sm font-medium mt-2 text-center">{{ mood.label }}</p>
      <p class="text-xs sm:text-sm text-gray-500 text-center">{{ mood.value }}%</p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import type { Moods } from '../interfaces/interfaces';


const props = defineProps({
  moods: {
    type: Object as () => Moods,
    required: true,
    default: () => ({}),
  },
});

// Trasforma l'oggetto in un array, escludendo __typename
const moodsArray = computed(() => {
  const filteredMoods = { ...props.moods };
  delete filteredMoods.__typename;

  return Object.entries(filteredMoods).map(([key, value]) => ({
    label: key,
    value: parseInt(value),
    color: getMoodColor(key),
    icon: getMoodIcon(key),
  }));
});

// Funzione per ottenere il colore in base all'umore
function getMoodColor(mood: string): string {
  const colors: { [key: string]: string } = {
    nature: '#34D399',
    relax: '#60A5FA',
    history: '#FBBF24',
    culture: '#F87171',
    party: '#9333EA',
  };
  return colors[mood] || '#E5E7EB';
}

// Funzione per ottenere l'icona in base all'umore
function getMoodIcon(mood: string): string {
  const icons: { [key: string]: string } = {
    nature: '/images/icons/nature.svg',
    relax: '/images/icons/relax.svg',
    history: '/images/icons/history.svg',
    culture: '/images/icons/culture.svg',
    party: '/images/icons/party.svg',
  };
  return icons[mood] || '/icons/default.svg';
}
</script>



