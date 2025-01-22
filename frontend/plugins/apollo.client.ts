/*import { ApolloClient, InMemoryCache } from '@apollo/client/core';

export default defineNuxtPlugin(() => {
  const apolloClient = new ApolloClient({
    uri: 'http://localhost:3017/graphql',
    cache: new InMemoryCache(),
  });

  return {
    provide: {
      apollo: apolloClient,
    },
  };
});*/



import { defineNuxtPlugin } from '#app';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';

export default defineNuxtPlugin((nuxtApp) => {
  console.log('Apollo Client Plugin Loaded'); // Debug: verifica che venga eseguito
  const apolloClient = new ApolloClient({
    uri: 'http://localhost:3017/graphql', // Modifica con il tuo endpoint GraphQL
    cache: new InMemoryCache(),
  });

  // Aggiungi il client Apollo al contesto dell'app
  nuxtApp.provide('apollo', apolloClient);
});


