export declare class PaymentsService {
    processPayment(bookingId: string, fakeToken: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
