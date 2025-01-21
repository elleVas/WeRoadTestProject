import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  async processPayment(
    bookingId: string,
    fakeToken: string,
  ): Promise<{ success: boolean; message: string }> {
    // Simula un controllo sul token
    if (!fakeToken || fakeToken !== 'valid_token') {
      return { success: false, message: 'Invalid payment token' };
    }

    // Simula un ritardo nel pagamento
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simula un risultato positivo
    return {
      success: true,
      message: `Payment for booking ${bookingId} was successful`,
    };
  }
}
