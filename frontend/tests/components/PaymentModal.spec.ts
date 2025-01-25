
import { render, fireEvent } from "@nuxt/test-utils";
import { describe, expect, it } from "vitest";

describe("ModalPayment", () => {
  it("renders correctly and validates input", async () => {
    const { getByPlaceholderText, getByText } = await render(
      "@/components/ModalPayment.vue"
    );

    // Verifica che il componente sia renderizzato
    expect(getByText("Payment Details")).toBeTruthy();

    // Simula l'inserimento di una carta di credito non valida
    const cardInput = getByPlaceholderText("Enter card number");
    await fireEvent.update(cardInput, "1234");
    expect(cardInput.value).toBe("1234");

    // Verifica il comportamento in caso di input errato
    const submitButton = getByText("Submit");
    await fireEvent.click(submitButton);
    expect(getByText("Invalid card number")).toBeTruthy();
  });
});
