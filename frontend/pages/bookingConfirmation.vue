<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-12 rounded-lg shadow-md text-center max-w-lg">
      <img
        src="../public/images/gif/monkeySpace.gif"
        alt="Monkey's Launch"
        class="w-40 h-40 mx-auto mb-6"
      />
      <h1 class="text-4xl font-bold text-black-600 mb-6">Your Journey Has Just Begun!</h1>
      <p class="text-gray-700 text-lg mb-8">
        Thank you for your booking, payment was successful.
      </p>
            <p class="text-gray-700 text-lg mb-8">
       We’re thrilled to be a part of your next adventure.
      </p>
      <p class="text-gray-700 text-lg mb-8">
        See you soon Monkey's.
      </p>
      <button
        @click="goToHome"
        class="bg-red-600 text-white px-8 py-4 rounded-lg shadow-md hover:bg-red-700 transition-all duration-200 text-lg"
      >
        Return to Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHome = () => {
  router.push('/');
};
</script>

<style scoped>
html,
body {
  margin: 0;
  height: 100%;
  font-family: Arial, sans-serif;
}
</style>