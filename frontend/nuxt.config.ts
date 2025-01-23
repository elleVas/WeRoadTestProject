import { defineNuxtConfig } from "nuxt/config";
import dotenv from 'dotenv';
// Carica il file .env.development todo to fix
dotenv.config({ path: '.env.development' });
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
   postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
    runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL,
    },
  },
})


