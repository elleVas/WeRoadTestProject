<template>
  <div class="text-center">
    <p class="text-sm text-gray-600">Complete your booking in:</p>
    <p class="text-xl font-bold text-red-600">{{ minutes }}:{{ seconds }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

defineProps({
  expiryTime: {
    type: Date,
    required: true,
  },
});

const timeLeft = ref(0);
const minutes = ref('00');
const seconds = ref('00');

const updateTimeLeft = () => {
  const now = new Date().getTime();
  timeLeft.value = Math.max(0, expiryTime.getTime() - now);

  if (timeLeft.value <= 0) return;

  const totalSeconds = Math.floor(timeLeft.value / 1000);
  minutes.value = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  seconds.value = String(totalSeconds % 60).padStart(2, '0');
};

onMounted(() => {
  updateTimeLeft();
  const interval = setInterval(() => {
    updateTimeLeft();
    if (timeLeft.value <= 0) clearInterval(interval);
  }, 1000);
});
</script>

<style scoped>
</style>
