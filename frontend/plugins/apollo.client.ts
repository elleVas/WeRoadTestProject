import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';

export default defineNuxtPlugin((nuxtApp) => {

  //runtime config access to env var
  const config = useRuntimeConfig();
  const apolloClient = new ApolloClient({
    uri: config.public.apiUrl,
    cache: new InMemoryCache(),
  });

  nuxtApp.provide('apollo', apolloClient);
});


