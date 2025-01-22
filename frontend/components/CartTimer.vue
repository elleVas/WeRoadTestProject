<template>
  <div class="text-center">
    <p class="text-sm text-gray-600">Complete your booking in:</p>
    <p class="text-xl font-bold text-red-600">{{ minutes }}:{{ seconds }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue';


const props = defineProps({
  expiryTime: {
    type: Date,
    required: true,
  },
});
// Evento emesso allo scadere
const emit = defineEmits(['timeExpired']); 

const timeLeft = ref(0);
const minutes = ref('00');
const seconds = ref('00');

// Funzione di aggiornamento del tempo
const updateTimeLeft = () => {
  const now = new Date().getTime();
  timeLeft.value = Math.max(0, props.expiryTime.getTime() - now);

  if (timeLeft.value <= 0) {
    emit('timeExpired'); 
    return;
  }

  const totalSeconds = Math.floor(timeLeft.value / 1000);
  minutes.value = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  seconds.value = String(totalSeconds % 60).padStart(2, '0');
};

// Inizializzazione e intervallo per aggiornare ogni secondo
onMounted(() => {
  updateTimeLeft();
  const interval = setInterval(() => {
    updateTimeLeft();
    if (timeLeft.value <= 0) clearInterval(interval);
  }, 1000);
});
</script>
