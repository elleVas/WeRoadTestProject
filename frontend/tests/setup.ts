import { setup } from "@nuxt/test-utils";

export const setupTestEnvironment = () => {
  return setup({
    // Avvia un server Nuxt per il test, se necessario
    server: true, 
    // Disattiva il rendering del browser, se non richiesto
    browser: false, 
  });
};
