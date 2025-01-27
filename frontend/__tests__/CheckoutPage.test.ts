import { mount } from "@vue/test-utils";
import CheckoutPage from "../pages/checkout.vue"; // Modifica con il percorso corretto
import { createRouter, createWebHistory } from "vue-router";
import { ApolloProvider } from "@apollo/client/core";
import { beforeEach, describe, expect, it } from "vitest";
import { createMockClient } from "mock-apollo-client";
import { CREATE_BOOKING } from "@/plugins/graphql/mutations"; 

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", name: "home" }],
});

describe("CheckoutPage", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(CheckoutPage, {
      global: {
        plugins: [router],
      },
    });
  });

  it("calcola correttamente il prezzo totale quando cambia il numero di posti", async () => {
    // Mock per il viaggio
    wrapper.vm.travel = {
      price: 100,
      startingDate: new Date(),
      endingDate: new Date(),
      maxCapacity: 10,
      description_extended: "Test Travel",
      moods: [],
    };

    // Impostazione del numero di posti
    await wrapper.setData({ seats: 3 });

    // Verifica che il prezzo totale sia 300
    expect(wrapper.vm.totalPrice).toBe(300);
  });

it("formatta correttamente la data", () => {
  const formattedDate = wrapper.vm.formatDate(new Date("2025-01-25"));
  expect(formattedDate).toBe("Sat, 25 Jan 25");
});

it("effettua la chiamata alla mutation quando si conferma la prenotazione", async () => {
  const mockClient = createMockClient();
  const wrapper = mount(CheckoutPage, {
    global: {
      plugins: [mockClient], // Usa il mock Apollo client
    },
  });

  wrapper.vm.travel = {
    price: 100,
    startingDate: new Date(),
    endingDate: new Date(),
    maxCapacity: 10,
    description_extended: "Test Travel",
    moods: [],
  };

  // Mock mutation response
  mockClient.setRequestHandler(CREATE_BOOKING, () => ({
    data: {
      createBooking: {
        id: "123",
      },
    },
  }));

  // Simula l'invio del form
  await wrapper.setData({ email: "test@test.com", seats: 2 });
  await wrapper.vm.confirmBooking();

  // Verifica che il bookingID sia impostato correttamente
  expect(wrapper.vm.bookingID).toBe("123");
  expect(wrapper.vm.dialogPayment).toBe(true);
});

});




